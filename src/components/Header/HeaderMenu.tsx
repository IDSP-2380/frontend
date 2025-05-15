import { useState } from 'react';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Burger, Container, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ButtonBase } from '../Buttons/ButtonBase';
import classes from './HeaderMenu.module.css';

export function HeaderMenu() {
  const navigate = useNavigate();
  const { user } = useUser();
  console.log(user);

  const links = [
    {
      id: 'user',
      link: '/stories-and-drafts',
      label: (
        <SignedIn>
          <span>{user?.username}</span>
          <Avatar src={user?.imageUrl} size={'40px'} radius={'xl'} className={classes.Avatar} />
        </SignedIn>
      ),
    },
    {
      id: 'login',
      link: '/sign-in/*',
      label: (
        <SignedOut>
          <ButtonBase
            onClick={() => navigate('/sign-in/*')}
            rightSection={<img src="icons/User.svg" />}
            buttonType="secondaryNeutral"
          >
            Log in
          </ButtonBase>
        </SignedOut>
      ),
    },
    {
      id: 'notifications',
      link: '',
      label: <img src="icons/Bell.svg" alt="notifications" />,
    },
    { id: 'settings', link: '', label: <img src="icons/Gear.svg" alt="notifications" /> },
    { id: 'help', link: '', label: <img src="icons/Help.svg" alt="notifications" /> },
  ];

  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.id}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.Header}>
      <Container size="md" className={classes.inner}>
        <img src="icons/Logo.svg" width={'123px'} />
        <Group gap={5} visibleFrom="xs" className={classes.Links}>
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
