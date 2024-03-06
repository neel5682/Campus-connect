import React, { useState } from 'react';

const CreatePost = () => {
  const [postContent, setPostContent] = useState('');

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: postContent }),
      });

      if (response.ok) {
        // Reset the post content after successful submission
        setPostContent('');
        console.log('Post created successfully!');
      } else {
        console.error('Failed to create post:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handlePostSubmit}>
      <label>Create Post:</label>
      <textarea value={postContent} onChange={handlePostChange} />

      <button type="submit">Submit Post</button>
    </form>
  );
};

export default CreatePost;
