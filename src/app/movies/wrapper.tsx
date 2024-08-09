'use client';

import Header from '@/components/header';
import { Fragment, ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
  title: string;
}

export default function Wrapper({ children, title }: Readonly<WrapperProps>) {
  return (
    <Fragment>
      <Header title={title} />
      <main>{children}</main>
    </Fragment>
  );
}
