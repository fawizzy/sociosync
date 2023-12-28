import got from "got";

async function createLinkedInPost(accessToken, postContent) {
  const url = "https://api.linkedin.com/v2/ugcPosts";

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postContent),
  };

  try {
    const response = await got.post(url, options);
    console.log("Post created successfully:", response.body);
    return response.body;
  } catch (error) {
    console.error("Error creating post:", error.response.body);
    throw new Error("Failed to create LinkedIn post");
  }
}

// Example usage
const accessToken = "<your-access-token>";
const postContent = {
  author: "urn:li:person:8675309",
  lifecycleState: "PUBLISHED",
  specificContent: {
    "com.linkedin.ugc.ShareContent": {
      shareCommentary: {
        text: "Hello World! This is my first Share on LinkedIn!",
      },
      shareMediaCategory: "NONE",
    },
  },
  visibility: {
    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
  },
};

createLinkedInPost(accessToken, postContent);
