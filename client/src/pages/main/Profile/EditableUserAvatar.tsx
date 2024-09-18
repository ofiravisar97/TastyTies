import { ChangeEventHandler, useRef } from "react";
import UserAvatar from "../../../components/UI/UserAvatar";

type Props = {
  id?: string;
  src?: string;
};

const EditableUserAvatar = ({ id, src }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEventHandler<HTMLInputElement>) => {};

  return (
    <div>
      <input
        accept=".jpeg,.png,.jpg"
        type="file"
        className="invisible"
        ref={inputRef}
      />
      <UserAvatar
        src={src}
        width={256}
        height={256}
        onClick={() => inputRef.current?.click()}
      />
    </div>
  );
};

export default EditableUserAvatar;
