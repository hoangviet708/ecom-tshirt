import { Header, Content, Footer, Slide } from "../../components";
import { ProductList } from "../../components";
import { productLists } from "../../common/sampleData";

const HomePage = () => {
  return (
    <div>
      <Header />
      <Slide />
      <Content
        children={
          <>
            <h1 className="title">
              NEW ARRIVALS
              <span className="line-title"></span>
            </h1>
            <ProductList productLists={productLists} />
          </>
        }
      />
      <Footer />
    </div>
  );
};

export default HomePage;
