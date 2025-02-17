import { View, Text, VirtualizedList, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { dummy } from "../../dummy";
import Post from "./Post";
import type { PostType } from "./Post";
const Posts = () => {
  const [posts, setPosts] = useState(dummy);

  const getItemCount = (data: []) => data.length;

  return (
    <SafeAreaView>
      <VirtualizedList
        data={posts}
        initialNumToRender={2}
        renderItem={({ item, index }: { item: PostType; index: number }) => (
          <Post item={item} index={index} />
        )}
        keyExtractor={(item: PostType) => item.id}
        getItemCount={getItemCount}
        getItem={(data, index) => data[index]}
      />
    </SafeAreaView>
  );
};

export default Posts;
