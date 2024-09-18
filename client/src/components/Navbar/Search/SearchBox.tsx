import { useEffect, useState } from "react";
import { type UserRowType } from "../../../types/userRow";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import UserRow from "../../UI/UserRow";
import { Loading02Icon } from "hugeicons-react";

const SearchBox = ({ searchQuery }: { searchQuery: string }) => {
  const [users, setUsers] = useState<UserRowType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const axios = useAxiosPrivate();

  const handleSearch = async () => {
    try {
      const response = await axios.get("/search", {
        params: { query: searchQuery },
      });
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    let timer: number;
    if (searchQuery !== "") {
      timer = setTimeout(() => {
        handleSearch();
      }, 1500);
    } else {
      setLoading(false);
      setUsers([]);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  return (
    <div className="absolute p-2 shadow-md rounded-md z-1 h-fit gap-4 flex  flex-col w-full bg-white top-[4.5rem] border border-borderColor">
      {!isLoading && users.length === 0 && (
        <p className="text-center">No users found.</p>
      )}
      {!isLoading &&
        users.length > 0 &&
        users.map((user) => <UserRow key={user.id} user={user} />)}
      {isLoading && (
        <Loading02Icon
          strokeWidth="3px"
          size={18}
          className="mx-auto animate-spin text-primary"
        />
      )}
    </div>
  );
};

export default SearchBox;
