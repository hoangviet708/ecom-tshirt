import { Header, Footer, Content } from "../../components";
import { ProductDetail } from "../../components";

const ProductPage = () => {
  window.scrollTo(0, 0);

  return (
    <div>
      <Header />
      <Content children={<ProductDetail />} />
      <Footer />
    </div>
  );
};

export default ProductPage;
