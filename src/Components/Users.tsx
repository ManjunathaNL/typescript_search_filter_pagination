import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap'
interface user {
  map(arg0: (item: any) => JSX.Element): import('react').ReactNode;
  name: string;
  email: string;
  phone: number;
}

export const Users = (): React.FC<user[]> => {
  const [user, setUser] = useState<user | undefined>();
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => setUser(json));
  }, []);

  return (
    <div className="p-2">
      <Table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S.no</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {user?.map((item) => (
            <tr>
              <th scope="row">{item.id}</th>
              <td>{item?.name}</td>
              <td>{item?.email}</td>
              <td>{item?.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};