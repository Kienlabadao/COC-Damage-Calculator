import { Navbar, Footer, ContentContainer } from "components";

export function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main className="container-fluid pb-5">
        <header className="text-center mt-3">
          <h1 className="brand__text text-center">
            <span className="brand__text--yellow">Changelog</span>
          </h1>
        </header>
        <section className="main-container mx-auto mt-5">
          <ContentContainer>
            <h2 className="text-center">10/9/2024 (September 2024 Update)</h2>
            <hr />
            <div>
              <ul>
                <li>
                  <div className="fw-bold">
                    Updated stats to September 2024 Update:
                  </div>
                  <ul>
                    <li>
                      <div className="fw-bold">Balance Changes:</div>
                      <ul>
                        <li>
                          <div>Earthquake Boots</div>
                        </li>
                        <li>
                          <div>Rage Gem</div>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="fw-bold">Supercharge Building:</div>
                      <ul>
                        <li>
                          <div>Scattershot</div>
                        </li>
                        <li>
                          <div>Inferno Tower</div>
                        </li>
                        <li>
                          <div>X-Bow</div>
                        </li>
                        <li>
                          <div>Hidden Tesla</div>
                        </li>
                        <li>
                          <div>Builder's Hut</div>
                        </li>
                        <li>
                          <div>Mortar</div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
              <div>
                * <span className="text-decoration-underline">Note</span>: I've
                decided to treat supercharge levels (only level that increase a
                defense's HP) as actual levels because implementing the
                supercharge level system for it would require heavy redesign of
                the codes. And in the context of this website - where only
                defense HP is needed - it makes more sense to handle it this
                way, and later replace supercharge level with the new level when
                it come out.
              </div>
            </div>
          </ContentContainer>
          <ContentContainer>
            <h2 className="text-center">26/8/2024 (June 2024 Update)</h2>
            <hr />
            <div>
              <ul>
                <li>
                  <div className="fw-bold">
                    Website is completed and ready for testing with 2 main
                    features:
                  </div>
                  <ul>
                    <li>
                      <div>Zapquake Calculator</div>
                    </li>
                    <li>
                      <div>Advance Calculator</div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </ContentContainer>
        </section>
      </main>
      <Footer />
    </>
  );
}
