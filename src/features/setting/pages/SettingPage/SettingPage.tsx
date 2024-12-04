import { BSColor } from "assets/data/config";
import { Navbar, Footer, Modal } from "components";
import { useClearStorage } from "features/setting/hooks/useClearStorage";

export function SettingPage() {
  return (
    <>
      <Navbar />

      <main className="container-fluid pb-5">
        <header className="text-center mt-3">
          <h1 className="brand__text text-center">
            <span className="brand__text--blue">Setting</span>
          </h1>
        </header>
        <section className="main-container mx-auto mt-5">
          <div id="status" className="status-container text-center d-none">
            <h3 className="info status-container__text"></h3>
          </div>
          <section className="p-4 shadow card-custom card-custom__main">
            <h2 className="text-center">General</h2>
            <hr />
            <div>
              <div className="d-flex align-items-center flex-wrap gap-3">
                <h3 className="mb-0">Clear local storage</h3>
                <div>
                  {/* Button trigger modal */}
                  <Modal
                    id="clearLocalStorage"
                    title="Clear local storage?"
                    openButtonProps={{
                      children: <span>Clear</span>,
                      color: BSColor.Red,
                    }}
                    modalButtons={[
                      {
                        children: <span>Close</span>,
                        color: BSColor.Gray,
                        closeOnClick: true,
                      },
                      {
                        children: <span>Clear</span>,
                        color: BSColor.Red,
                        closeOnClick: true,
                        onClick: useClearStorage,
                      },
                    ]}
                  >
                    <div>Are you sure you want to clear local storage?</div>
                  </Modal>
                </div>
              </div>
            </div>
            <div className="mt-3">
              Clear your local storage on this website. This includes theme
              preferences and your options in the calculator.
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
}
