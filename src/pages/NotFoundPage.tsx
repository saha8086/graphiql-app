import { FC } from 'react';
import { Link } from 'react-router-dom';

// todo: https://github.com/saha8086/graphiql-app/issues/3
const NotFoundPage: FC = () => {
  return (
    <>
      <h1>Not Found</h1>
      <Link to="/">GO HOME</Link>
    </>
  );
};

export default NotFoundPage;
