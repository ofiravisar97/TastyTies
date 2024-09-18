import { UserCircleIcon } from "hugeicons-react";

const UserAvatar = (props: {
  src: string | undefined;
  onClick?: () => void;
  width: number;
  height: number;
}) => {
  return (
    <div onClick={props.onClick} className="cursor-pointer">
      {props.src ? (
        <img
          alt="User Profile Image"
          className={`rounded-full shadow-md object-center object-fill border border-black cursor-pointer`}
          src={props.src}
          width={props.width}
          height={props.height}
        />
      ) : (
        <UserCircleIcon size={40} />
      )}
    </div>
  );
};

export default UserAvatar;
