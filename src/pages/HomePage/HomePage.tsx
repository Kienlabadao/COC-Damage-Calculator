import { BS_COLOR, PAGE_URLS, EXTERNAL_URLS } from "assets/data/config";
import { Navbar, Footer, ContentContainer, MainContainer } from "components";
import { LinkButton } from "components/LinkButton";

export function HomePage() {
  return (
    <>
      <Navbar />

      <MainContainer>
        <header className="text-center">
          <img src="/images/other/coc.png" width="200" />
          <h1 className="brand__text">
            <span className="brand__text--orange d-inline-block mt-2">
              Damage
            </span>
            <span className="brand__text--yellow d-inline-block mt-2">
              Calculator
            </span>
          </h1>
        </header>
        <section className="main-container mx-auto mt-5">
          <ContentContainer>
            <h2 className="text-center">!!! Important !!!</h2>
            <hr />
            <div className="row align-items-center">
              <div className="col-md-3 text-center">
                <img src="/images/other/builder.webp" width="160" />
              </div>
              <div className="col-md-9">
                <h5>This website is currently in the testing phase.</h5>
                <ul>
                  <li>
                    Please help me test it as much as possible, as I need to
                    ensure everything runs smoothly.
                  </li>
                  <li>
                    Any bug reports or feedback are{" "}
                    <strong>greatly appreciated!</strong>
                  </li>
                  <li>
                    <div>
                      I also have some design choices that I'm unsure about.
                      I've listed them all in this form, which also serves as a
                      bug report/feedback sheet.
                    </div>
                    <div>
                      <div>
                        <LinkButton
                          color={BS_COLOR.Blue}
                          link={EXTERNAL_URLS.TestForm}
                          openInNewTab={true}
                        >
                          <i className="fa-solid fa-sheet-plastic"></i> Link to
                          the form
                        </LinkButton>
                      </div>
                    </div>
                  </li>
                </ul>
                <h5>Thank you! ❤</h5>
              </div>
            </div>
          </ContentContainer>

          <ContentContainer>
            <h2 className="text-center">Introduction</h2>
            <hr />
            <div>
              <p>
                Welcome to the <strong className="fs-4">Clash of Clans</strong>{" "}
                <span className="brand__text brand__text--orange brand__text--no-shadow">
                  Damage
                </span>{" "}
                <span className="brand__text brand__text--yellow brand__text--no-shadow">
                  Calculator
                </span>{" "}
                - your one-stop spot for all damage calculations in Clash of
                Clans!
              </p>
              <ul>
                <li>
                  <p>
                    Do you need to know{" "}
                    <strong>how many lightning and earthquake spells</strong>{" "}
                    are needed to take out a{" "}
                    <strong>max level town hall</strong> with the help of{" "}
                    <strong>
                      fireball and giant arrow? I got you covered! 👍
                    </strong>
                  </p>
                </li>
                <li>
                  <p>
                    Do you need to know <strong>how quickly</strong> you need to
                    snipe the clan castle with{" "}
                    <strong>fireball and earthquake spell</strong> before{" "}
                    <strong>the builders</strong> can save it?{" "}
                    <strong>I got you covered! 👍</strong>
                  </p>
                </li>
                <li>
                  <p>
                    Do you need to know <strong>how many defenses</strong> can
                    survive <strong>5 Giant Arrows</strong> shot? That's quite
                    an interesting question but hey,{" "}
                    <strong>I also got you covered! 👍</strong>
                  </p>
                </li>
              </ul>
              <div>This website have 2 main features:</div>
              <ul>
                <li className="mt-1">
                  <div className="d-flex align-items-center flex-wrap">
                    <div className="me-3 fw-bold">Zapquake Calculator</div>
                    <div>
                      <LinkButton
                        color={BS_COLOR.Gray}
                        link={PAGE_URLS.ZapquakeCalcPage}
                      >
                        Visit
                      </LinkButton>
                    </div>
                  </div>
                </li>
                <li className="mt-3">
                  <div className="d-flex align-items-center flex-wrap">
                    <div className="me-3 fw-bold">Advance Calculator</div>
                    <div>
                      <LinkButton
                        color={BS_COLOR.Gray}
                        link={PAGE_URLS.AdvanceCalcPage}
                      >
                        Visit
                      </LinkButton>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </ContentContainer>

          <ContentContainer>
            <h2 className="text-center">Information</h2>
            <hr />
            <div>
              <div>
                <div className="mb-3">
                  <span className="brand__text brand__text--blue brand__text--no-shadow">
                    Zap
                  </span>
                  <span className="brand__text brand__text--brown brand__text--no-shadow">
                    Quake
                  </span>
                  <span className="brand__text brand__text--yellow brand__text--no-shadow">
                    Calculator
                  </span>
                </div>
                <p>
                  This is where you can calculate how many Lightning and
                  Earthquake spells are needed to take down a defense at
                  specific level.
                </p>
                <div>
                  While there are many other zapquake calculator available out
                  there, mine offers <strong>2 extra features:</strong>
                </div>
                <ul>
                  <li>
                    <div className="fw-bold">
                      The ability to account for hero equipment.
                    </div>
                    <div>
                      This is exactly why I created this website in the first
                      place.
                    </div>
                  </li>
                  <li>
                    <div className="fw-bold">
                      The ability to factor in donated Lightning spells.
                    </div>
                    <div>
                      This is particularly useful for low to mid-level Townhall
                      players, as you typically receive high-level Lightning
                      spells in your Clan Castle.
                    </div>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="mt-4">
                <div className="mb-3">
                  <span className="brand__text brand__text--orange brand__text--no-shadow">
                    Advance
                  </span>
                  <span className="brand__text brand__text--yellow brand__text--no-shadow">
                    Calculator
                  </span>
                </div>
                <div>
                  This is where you can do more advance calculation. Featuring:
                </div>
                <ul>
                  <li>
                    <div className="fw-bold">
                      The ability to select actions such as spells, hero
                      equipment, troops, in any order.
                    </div>
                  </li>
                  <li>
                    <div className="fw-bold">
                      The option to manage those actions by removing or
                      reordering them.
                    </div>
                  </li>
                  <li>
                    <div className="fw-bold">Calculate:</div>
                    <ul>
                      <li>
                        <div className="fw-bold">
                          How much damage each action inflicts.
                        </div>
                      </li>
                      <li>
                        <div className="fw-bold">
                          The remaining HP of the defense after each action.
                        </div>
                      </li>
                      <li>
                        <div className="fw-bold">
                          The impact of modifiers (e.g., Rage spell, cumulative
                          Earthquake damage).
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div>This is particularly useful if you need to:</div>
                <ul>
                  <li>
                    <div className="fw-bold">
                      Determine whether you should take down a defense which
                      direct damage offense (like Fireball, Giant Arrow, etc.)
                      while there are Battle Builders around. If so, you can
                      calculate how quickly you need to act before the builders
                      save it.
                    </div>
                  </li>
                  <li>
                    <div className="fw-bold">
                      Calculate how many troops (currently, Balloons and Rocket
                      Balloons) are needed to take down a defense.
                    </div>
                    <div>
                      This is especially valuable for Lavaloon strategy or when
                      you want to snipe a specific defense.
                    </div>
                  </li>
                  <li>
                    <div className="fw-bold">Or just for fun.</div>
                    <div>
                      Ever wondered how much HP a max-level Town Hall has left
                      after 5 Earthquake Boots and 7 Earthquake spells? Well,
                      you probably haven't thought about that, but hey, why not
                      find out?
                    </div>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="mt-4">
                <h3>Other</h3>
                <ul>
                  <li>
                    While the website is supported on small screens like phones,
                    it's recommended to use a larger screen, such as a monitor
                    or tablet, for the best experience.
                  </li>
                  <li>
                    Future plan:
                    <ul>
                      <li>Make demonstration video for each calculators.</li>
                      <li>
                        Add support for more troops in the advance calculator.
                      </li>
                      <li>Add support for hero in the advance calculator.</li>
                    </ul>
                  </li>
                  <li>
                    I will work on them in the future whenever I have free time.
                    Otherwise, the website is fully functional and ready to use.
                    As always, I will update the data whenever there are new
                    updates or balance changes coming to the game.
                  </li>
                </ul>
              </div>
            </div>
          </ContentContainer>

          <ContentContainer>
            <h2 className="text-center">Links</h2>
            <hr />
            <div>
              <div>
                Found a <strong>bug?</strong> Have <strong>suggestion?</strong>{" "}
                Contact me via:
              </div>
              <ul className="mt-1">
                <li>
                  <div className="d-flex align-items-center flex-wrap">
                    <div className="me-2">Reddit</div>
                    <div>
                      <LinkButton
                        color={BS_COLOR.Orange}
                        link={EXTERNAL_URLS.Reddit}
                        openInNewTab={true}
                      >
                        <i className="fa-brands fa-reddit-alien"></i> Reddit
                      </LinkButton>
                    </div>
                  </div>
                </li>
                <li className="mt-3">
                  <div className="d-flex align-items-center flex-wrap">
                    <div className="me-2">Discord</div>
                    <div>
                      <LinkButton
                        color={BS_COLOR.Blue}
                        link={EXTERNAL_URLS.Discord}
                        openInNewTab={true}
                      >
                        <i className="fa-brands fa-discord"></i> Discord
                      </LinkButton>
                    </div>
                  </div>
                </li>
                <li className="mt-3">
                  <div className="d-flex align-items-center flex-wrap">
                    <div className="me-2">Prefer staying anonymous?</div>
                    <div>
                      <LinkButton
                        color={BS_COLOR.Blue}
                        link={EXTERNAL_URLS.BugReportForm}
                        openInNewTab={true}
                      >
                        <i className="fa-solid fa-sheet-plastic"></i> Fill in
                        this form
                      </LinkButton>
                    </div>
                  </div>
                </li>
              </ul>
              <div>Other links:</div>
              <ul className="mt-1">
                <li>
                  <div className="d-flex align-items-center flex-wrap">
                    <div className="me-2">Source Code</div>
                    <div>
                      <LinkButton
                        color={BS_COLOR.Blue}
                        link={EXTERNAL_URLS.SourceCode}
                        openInNewTab={true}
                      >
                        <i className="fa-brands fa-github"></i> Github
                      </LinkButton>
                    </div>
                  </div>
                </li>
                <li className="mt-3">
                  <div className="d-flex align-items-center flex-wrap">
                    <div className="me-2">Like my work?</div>
                    <div>
                      <LinkButton
                        color={BS_COLOR.LightGreen}
                        link={EXTERNAL_URLS.Donate}
                        openInNewTab={true}
                      >
                        ☕ Buy me a coffee
                      </LinkButton>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </ContentContainer>

          <ContentContainer>
            <h2 className="text-center">Credits</h2>
            <hr />
            <div>
              <ul>
                <li>
                  <a href={EXTERNAL_URLS.Zapquaker} target="_blank">
                    Zapquaker
                  </a>{" "}
                  for inspired me to make this website (and some UI design
                  ideas)
                </li>
                <li>
                  <a href={EXTERNAL_URLS.COCWiki} target="_blank">
                    Clash of Clans Wiki
                  </a>{" "}
                  for informations, images, and formula.
                </li>
                <li>
                  Friends and Clanmates for helping with testing and feedback to
                  ensure the website runs smoothly.
                </li>
                <li>
                  <div>You - the user.</div>
                  <ul>
                    <li>
                      I've always wanted to make something that helps others. By
                      contributing, giving feedbacks, or just using this site,
                      you're making my day. Thank you! ❤
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </ContentContainer>
        </section>
      </MainContainer>

      <Footer />
    </>
  );
}
