import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { updateViews } from '../../apis/postDetail';

interface ViewsProps {
  pid: string;
  view: number;
}

const Views = ({ pid, view }: ViewsProps) => {
  const [countViews, setCountViews] = useState(view);

  const { mutate: viewMutation } = useMutation(({ pid, view }: ViewsProps) =>
    updateViews(pid, view),
  );
  useEffect(() => {
    setCountViews(countViews + 1);
  }, []);

  useEffect(() => {
    viewMutation({ pid, view: countViews });
  }, [countViews]);

  return <div>조회 {countViews}</div>;
};

export default Views;
