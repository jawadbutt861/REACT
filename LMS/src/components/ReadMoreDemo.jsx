import { ReadMore } from './UI';

const ReadMoreDemo = () => {
  const sampleTexts = [
    {
      title: "Short Text (No ReadMore needed)",
      text: "This is a short description that doesn't need truncation."
    },
    {
      title: "Medium Text (ReadMore at 50 chars)",
      text: "This is a medium-length description that will be truncated after 50 characters to demonstrate the ReadMore functionality in action."
    },
    {
      title: "Long Text (ReadMore at 100 chars)",
      text: "This is a much longer description that contains detailed information about a course or topic. It includes multiple sentences and provides comprehensive details about what students can expect to learn. The ReadMore component will truncate this text and provide an option to expand it for full reading."
    }
  ];

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>
          ReadMore Component Demo
        </h2>
        
        <div className="space-y-6">
          {sampleTexts.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
                {item.title}
              </h3>
              <ReadMore 
                text={item.text}
                maxLength={index === 0 ? 200 : index === 1 ? 50 : 100}
                className="text-sm"
                style={{ color: 'var(--text-muted)' }}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold mb-2 text-blue-800">Usage Examples:</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• <code>maxLength={100}</code> - Truncate after 100 characters</p>
            <p>• <code>expandText="Show more"</code> - Custom expand text</p>
            <p>• <code>collapseText="Show less"</code> - Custom collapse text</p>
            <p>• Automatically handles short text (no truncation needed)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadMoreDemo;