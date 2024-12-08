import { Link } from "react-router-dom";
import { PAGE_URLS } from "assets/data/config";
import { Navbar, Footer } from "components";

export function PageNotFoundPage() {
  return (
    <>
      <Navbar />
      <main className="container-fluid pb-5">
        <header className="text-center mt-3">
          <img src="/images/other/confused.webp" height="200" />
          <h1 className="brand__text text-center">
            <span className="brand__text--orange">Uh oh!</span>
          </h1>
        </header>

        <section className="main-container mx-auto mt-5">
          <div>
            <div className="fs-3 fw-bold text-center">
              <div>
                Our barbarian couldn't find the page you were looking for.
              </div>
              <div>
                <span>Click </span>
                <Link to={PAGE_URLS.HomePage}>here</Link>
                <span> to go back to the home page.</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
