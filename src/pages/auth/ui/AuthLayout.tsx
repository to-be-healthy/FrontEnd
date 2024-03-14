import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100dvw;
  height: 100dvh;
  background-color: #535353;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 390px; /* 임시 */
  min-width: 390px;
  height: 100%;
  background-color: white;
`;

interface Props {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: Props) => {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};
