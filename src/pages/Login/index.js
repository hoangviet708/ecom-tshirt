import { Header, Footer, Content } from "../../components";
import { FormLogin } from "../../components";

const LoginPage = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      <Header />
      <Content children={<FormLogin />} />
      <Footer />
    </div>
  );
};

export default LoginPage;
