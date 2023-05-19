import { Divider } from '@chakra-ui/react';
import { ReactNode } from 'react';

type QueryType = {
  args: Argument[];
  astNode: unknown;
  deprecationReason: unknown;
  description: string;
  extensions: object;
  name: string;
  resolve: unknown;
  subscribe: unknown;
  type: object;
};

type Argument = {
  astNode: unknown;
  deprecationReason: unknown;
  defaultValue: unknown;
  description: string;
  extensions: object;
  name: string;
  type: object;
};

//todo
// const expandArgs = (args: Argument[]) => {
//   return;
// };

const expandTree = (TreeNode: object | undefined): ReactNode[] => {
  if (!TreeNode) {
    return [];
  }
  const entries = Object.entries(TreeNode);
  const keys = Object.keys(TreeNode);
  const result: ReactNode[] = [];
  if (!keys.includes('type')) {
    entries.forEach((entry: [string, unknown]) => {
      const currentNode = entry[1] as QueryType;
      const reactNode = (
        <div key={currentNode.name} className="mt-[16px]">
          <pre>
            <h3 className="queryType">{currentNode.name + ':'}</h3>
            <span className="gray-text">{'('}</span>
            {`\n123`}
            <span className="gray-text">{')'}</span>
          </pre>
          <p className="gray-text my-[12px]">{currentNode.description}</p>
          <Divider />
        </div>
      );
      result.push(reactNode);
    });
  }
  return result;
};

export default expandTree;
