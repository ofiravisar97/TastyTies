import { Image01Icon } from "hugeicons-react";
import { ChangeEvent, useRef } from "react";
import useAddRecipeModal from "../../../hooks/useAddRecipeModal";

const AddRecipeFirstTitle = () => {
  return (
    <figure className="flex flex-col space-y-4">
      <input
        placeholder="Title"
        className="border border-borderColor p-2 rounded-md"
      />
      <textarea
        placeholder="Description"
        className="border border-borderColor p-2 rounded-md resize-none"
      />
    </figure>
  );
};

const AddRecipeFirstImage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setAddRecipeStatus, addRecipeStatus } = useAddRecipeModal();

  const handleClickUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      if (!imageUrl) {
        return;
      }
      setAddRecipeStatus((prev) => ({ ...prev, imageUrl }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <figure className="flex items-center justify-center max-h-full max-w-full">
      <div className="flex items-center justify-center flex-col min-h-full min-w-full">
        <input
          type="file"
          accept=".jpg,.png,.jpeg"
          ref={inputRef}
          onChange={handleClickUpload}
          className="hidden"
        />
        {!addRecipeStatus && (
          <>
            <Image01Icon className="size-60" />
            <button
              className="bg-primary p-2 rounded-md shadow-md text-borderColor font-semibold mt-8"
              type="button"
              onClick={() => {
                inputRef.current?.click();
              }}
            >
              Upload Image
            </button>
          </>
        )}
        {addRecipeStatus && addRecipeStatus.imageUrl !== "" && (
          <div className="py-4 max-h-full max-w-full overflow-hidden min-w-full min-h-full">
            <img
              src={addRecipeStatus?.imageUrl}
              alt="Add Recipe Image"
              onClick={() => {
                inputRef.current?.click();
              }}
              className="rounded-md shadow-md object-cover object-center w-[55rem] h-[35rem]"
            />
          </div>
        )}
      </div>
    </figure>
  );
};

const AddRecipeFirst = () => {
  return (
    <form
      method="POST"
      className="w-full p-4 h-full grid grid-rows-[auto,40rem]"
    >
      <AddRecipeFirstTitle />
      <AddRecipeFirstImage />
    </form>
  );
};

export default AddRecipeFirst;
