import EditCard from '@/components/Cards/EditCard';
import TextEditor from '@/components/TextEditor/TextEditor';

export function EditorPage() {
  const testData = [
    {
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus incidunt ipsa soluta delectus debitis excepturi provident neque numquam, minus omnis nihil, sit praesentium aperiam! Consequatur provident accusamus eum sequi atque.',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus incidunt ipsa soluta delectus debitis excepturi provident neque numquam, minus omnis nihil, sit praesentium aperiam! Consequatur provident accusamus eum sequi atque.',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus incidunt ipsa soluta delectus debitis excepturi provident neque numquam, minus omnis nihil, sit praesentium aperiam! Consequatur provident accusamus eum sequi atque.',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus incidunt ipsa soluta delectus debitis excepturi provident neque numquam, minus omnis nihil, sit praesentium aperiam! Consequatur provident accusamus eum sequi atque.',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus incidunt ipsa soluta delectus debitis excepturi provident neque numquam, minus omnis nihil, sit praesentium aperiam! Consequatur provident accusamus eum sequi atque.',
    },
  ];

  return (
    <>
      <h1>Story title goes here or some shit</h1>

      {testData.map((story, index) => {
        return <EditCard linkNumber={(index + 1).toString()} linkContent={story.content} />;
      })}

      <TextEditor />
    </>
  );
}
