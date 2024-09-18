type UserInfoProps = {
  displayName?: string;
  followersCount?: number;
};

type TagNCountProps = {
  tag: string;
  count?: number;
};

const TagNCount = ({ tag, count }: TagNCountProps) => {
  return (
    <li className="flex flex-col gap-2">
      <h2>{tag}</h2>
      <p className="text-center">{count}</p>
    </li>
  );
};

const UserInfo = ({ displayName, followersCount }: UserInfoProps) => {
  return (
    <article className="flex flex-col justify-center items-center w-full ">
      <h2 className="font-semibold text-2xl">@{displayName}</h2>
      <ul className="flex gap-8">
        <TagNCount tag="Followers" count={followersCount || 0} />
        <TagNCount tag="Recipes" count={1} />
        <TagNCount tag="Bookmarks" count={5} />
      </ul>
    </article>
  );
};

export default UserInfo;
