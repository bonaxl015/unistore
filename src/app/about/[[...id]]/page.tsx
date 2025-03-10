import { FC } from 'react';

interface AboutByIdAndSlugProps {
  params: {
    id: string[];
  };
}

const AboutByIdAndSlug: FC<AboutByIdAndSlugProps> = async ({ params }) => {
  const { id: idList } = await params;

  if (!idList) return <div>About normal page</div>;

  const [dataId, slug] = idList;

  return (
    <div>
      AboutByIdAndSlug {dataId} {slug}
    </div>
  );
};

export default AboutByIdAndSlug;
