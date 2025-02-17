import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type PostType = {
  id: string;
  first_name: string;
  last_name: string;
  img: string;
  avatar: string;
  likes: number;
  comments: number;
};

const Post = ({ item, index }: { item: PostType; index: number }) => {
  return (
    <View style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.header}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.username}>
          {item.first_name} {item.last_name}
        </Text>
      </View>

      {/* Post Image */}
      <Image source={{ uri: item.img }} style={styles.postImage} />

      {/* Post Actions */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconSpacing}>
            <Ionicons name="chatbubble-outline" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={25} color="black" />
        </TouchableOpacity>
      </View>

      {/* Likes */}
      <Text style={styles.likes}>{item.likes} likes</Text>

      {/* Caption */}
      <Text style={styles.caption}>
        <Text style={styles.username}>
          {item.first_name} {item.last_name}{" "}
        </Text>
        This is a sample caption for the Instagram post.
      </Text>

      {/* Comments */}
      <Text style={styles.comments}>View all {item.comments} comments</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#fff",
    borderBottomColor: "#dfdfdf",
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    marginLeft: 10,
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  leftActions: {
    flexDirection: "row",
  },
  iconSpacing: {
    marginLeft: 15,
  },
  likes: {
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  caption: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  comments: {
    paddingHorizontal: 10,
    color: "gray",
    paddingVertical: 2,
  },
});

export default Post;
