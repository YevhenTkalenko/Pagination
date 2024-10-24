interface Props {
  id: number;
  name: string;
  email: string;
  body: string;
}

const Countries = ({ id, name, email, body }: Props) => {
  return (
    <>
      <div>
        <div>User id : {id}</div>
      </div>
      <div>
        <div>User name : {name}</div>
      </div>
      <div>
        <div>User email : {email}</div>
      </div>
      <div>
        <div>Comment : {body}</div>
      </div>
    </>
  );
};
export default Countries;
