import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

function ContentContainer({ children }: Props) {
  return (
    <section className="card-custom card-custom__main shadow p-4 my-5">{children}</section>
  );
}

export default ContentContainer;