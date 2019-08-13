import React from 'react';
import { Label } from 'semantic-ui-react';
import axios from 'axios'

class NavBar extends React.Component {
  async componentDidMount() {
    const user = axios.get('/api/user/bills/:user')
  }

  render() {
    const imageProps = {
      avatar: true,
      spaced: 'right',
      src: '/assets/img/userIcon.png'
    };
    return (
      <div
        style={{
          backgroundColor: 'rgb(51, 51, 51)',
          height: '50px',
          marginBottom: '20px'
        }}
      >
        <ul
          style={{
            listStyleType: 'none',
            margin: '0',
            padding: '0',
            height: '100%'
          }}
        >
          <li style={{ display: 'inline' }}>
            <a
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                color: 'white',
                padding: '16px 16px'
              }}
              href='#'
            >
              Home
            </a>
          </li>
          <li style={{ display: 'inline' }}>
            <a
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                color: 'white',
                padding: '16px 16px'
              }}
              href='#'
            >
              Your Bills
            </a>
          </li>
          <Label
            style={{ float: 'right', marginRight: '5px', marginTop: '5px' }}
            as='a'
            content='User'
            image={imageProps}
          />
        </ul>
      </div>
    );
  }
}

export default NavBar;
