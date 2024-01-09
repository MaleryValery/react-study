import Button from './Button';

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label htmlFor="friend-name">👯‍♀️ Friend name</label>
      <input id="friend-name" type="text" />
      <label htmlFor="image-url">🌄 Image Url</label>
      <input id="image-url" type="text" />
      <Button title="Add" />
    </form>
  );
}

export default FormAddFriend;
