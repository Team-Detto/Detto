export const products: string[] = ['Figma', 'Notion', 'Protopie', 'Framer'];
export const develops: string[] = [
  'JavaScript',
  'TypeScript',
  'React',
  'Vue',
  'Svelte',
  'Nextjs',
  'Java',
  'Spring',
  'Nodejs',
  'Go',
  'Express',
  'MySQL',
  'MongoDB',
  'Python',
  'Django',
  'php',
  'GraphQL',
  'Firebase',
  'Flutter',
  'Swift',
  'Kotlin',
  'ReactNative',
  'Unity',
  'Git',
  'C',
  'AWS',
  'Kubernetes',
];
export const designs: string[] = [
  'Figma',
  'Notion',
  'Protopie',
  'Framer',
  'Zeplin',
];

// 기술 스택 하나로 합치는 함수
export const concatSkills = (
  stack1: any,
  stack2: any,
  stack3: any,
): string[] => {
  return [].concat(stack1, stack2, stack3);
};
