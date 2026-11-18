"""Source integrity, feedback retention, and cleanup boundaries for new papers."""
from pathlib import Path
import importlib.util,json,tempfile,unittest,contextlib,io,subprocess
from types import SimpleNamespace
ROOT=Path(__file__).resolve().parents[1]
def module(path):
 spec=importlib.util.spec_from_file_location(path.stem,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
h=module(ROOT/'seminar-template/scripts/seminar.py');creator=module(ROOT/'scripts/new_seminar.py')
class Harness(unittest.TestCase):
 def setUp(self):
  self.quiet=contextlib.redirect_stdout(io.StringIO());self.quiet.__enter__()
  self.temp=tempfile.TemporaryDirectory();self.root=Path(self.temp.name)/'paper-test';creator.create(self.root,'Test paper');self.old=h.ROOT;h.ROOT=self.root
 def tearDown(self):h.ROOT=self.old;self.temp.cleanup();self.quiet.__exit__(None,None,None)
 def test_fresh_copy_and_frames(self):
  self.assertEqual(json.loads((self.root/'seminar.json').read_text())['title'],'Test paper')
  self.assertFalse((self.root/'content/manifest.json').exists());self.assertFalse((self.root/'review/previews').exists())
  pages=h.read_pages();self.assertEqual([len(p['frames']) for p in pages],[1,2,1]);self.assertEqual(pages[1]['frames'][0]['title'],'먼저 차이를 직관적으로')
 def test_refuse_existing_project(self):
  with self.assertRaises(ValueError):creator.create(self.root,'Overwrite')
 def test_missing_speech_and_duplicate_id(self):
  p=self.root/'sections/00-start.md';s=p.read_text();p.write_text(s.replace('### 대본','### 다른 항목',1))
  with self.assertRaisesRegex(ValueError,'대본'):h.read_pages()
  p.write_text(s.replace('[S003]','[S002]'))
  with self.assertRaisesRegex(ValueError,'중복'):h.read_pages()
 def test_feedback_praise_and_correction_are_append_only(self):
  p=self.root/'review/FEEDBACK.md';before=p.read_text();h.feedback(SimpleNamespace(slide='S002',kind='praise',text='원문 그대로 좋은 연결'))
  h.feedback(SimpleNamespace(slide='S002',kind='correction',text='그림의 순서를 고쳐줘'))
  text=p.read_text();self.assertTrue(text.startswith(before));self.assertIn('좋은 연결',text);self.assertIn('고쳐줘',text)
 def test_study_never_overwrites(self):
  args=SimpleNamespace(section='01-intro',title='Introduction');h.study(args);p=self.root/'study/01-intro.md';self.assertIn('Test paper',p.read_text())
  with self.assertRaises(ValueError):h.study(args)
 def test_invalid_part_and_image_escape(self):
  p=self.root/'sections/00-start.md';p.write_text(p.read_text().replace('part: 1','part: ../outside',1))
  with self.assertRaisesRegex(ValueError,'Part'):h.read_pages()
  import re
  with self.assertRaises(ValueError):h.inline_image(re.search(r'src="([^"]+)"','src="../../private.png"'))
 def test_clean_preserves_tracked_cache(self):
  subprocess.run(['git','init','-q'],cwd=self.root,check=True)
  cache=self.root/'.cache';cache.mkdir();(cache/'retained.txt').write_text('tracked evidence')
  subprocess.run(['git','add','-f','.cache/retained.txt'],cwd=self.root,check=True)
  h.clean(True);self.assertTrue((cache/'retained.txt').exists())
 def test_clean_preserves_current_and_referenced_previews_and_study(self):
  content=self.root/'content';content.mkdir(exist_ok=True);(content/'manifest.json').write_text(json.dumps({'fingerprint':'aaaaaaaaaaaa'}))
  for name in ['aaaaaaaaaaaa','bbbbbbbbbbbb','cccccccccccc']:
   p=self.root/'review/previews'/name;p.mkdir(parents=True);(p/'image.png').write_bytes(b'capture')
  with (self.root/'review/FEEDBACK.md').open('a') as f:f.write('\n참고: review/previews/bbbbbbbbbbbb/image.png\n')
  (self.root/'.cache').mkdir();h.clean(False);self.assertTrue((self.root/'.cache').exists());h.clean(True)
  self.assertTrue((self.root/'review/previews/aaaaaaaaaaaa').exists());self.assertTrue((self.root/'review/previews/bbbbbbbbbbbb').exists());self.assertFalse((self.root/'review/previews/cccccccccccc').exists());self.assertFalse((self.root/'.cache').exists());self.assertTrue((self.root/'review/FEEDBACK.md').exists())
if __name__=='__main__':unittest.main()
