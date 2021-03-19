import Button from './button.js'

export default function Navbar({ user, loginUrl, bgColor = 'nsorange' }) {
  return (
    <nav className={`dn dn-m db-ns bg-${bgColor}`}>
      <div className="flex items-center justify-between ph5 pv3 center mw9">
        <div>
          <a href="/" className="no-underline v-mid">
            <img
              src="/images/logo-nft.storage-sm.png"
              width="160"
              height="79"
              className="mr4 v-mid"
              style={{ maxWidth: '80px', height: 'auto' }}
              alt="NFT Storage Logo"
            />
          </a>
          <a
            href="/#getting-started"
            className="f4 black no-underline underline-hover v-mid"
          >
            Getting Started
          </a>
          <span className="mh2 v-mid b black">•</span>
          <a
            href="/api-docs"
            className="f4 black no-underline underline-hover v-mid"
          >
            API Docs
          </a>
          {user ? (
            <>
              <span className="mh2 v-mid b black">•</span>
              <a
                href="/manage"
                className="f4 black no-underline underline-hover v-mid"
              >
                Manage API Keys
              </a>
              <span className="mh2 v-mid b black">•</span>
              <a
                href="/files"
                className="f4 black no-underline underline-hover v-mid"
              >
                Files
              </a>
            </>
          ) : null}
        </div>
        <div>
          {user ? (
            <Button href="/logout">Logout</Button>
          ) : (
            <>
              <Button wrapperClassName="mr3" href={loginUrl}>
                Register
              </Button>
              <Button href={loginUrl}>Login</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
