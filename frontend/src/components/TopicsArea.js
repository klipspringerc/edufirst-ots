import React from 'react';

const TopicsArea = ({topics}) => {
  const groupedTopics = topics.reduce((rows, key, index) =>
      (index % 4 === 0
          ? rows.push([key])
          : rows[rows.length - 1].push(key) && rows), []);
  return (
      <div>
        <table>
          {groupedTopics.map((group, outerIndex) => (
              <tr key={outerIndex}>
                {group.map((topic, innerIndex) => (
                    <td key={innerIndex}>
                      <img src={topic.url} alt={topic.name}/>
                      {topic.name}
                    </td>
                ))}
              </tr>
          ))}
        </table>
      </div>
  );
};

export default TopicsArea;