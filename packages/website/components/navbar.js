import { useMemo, useRef, useState } from 'react'
import Router from 'next/router'
import clsx from 'clsx'
import Link from 'next/link'
import { useQueryClient } from 'react-query'
import { getMagic } from '../lib/magic.js'
import { useResizeObserver } from '../hooks/resize-observer'
import Button from './button.js'
import Cross from '../icons/cross'
import Hamburger from '../icons/hamburger'

/**
 * Navbar Component
 *
 * @param {Object} props
 * @param {string} [props.bgColor]
 * @param {any} [props.user]
 */
export default function Navbar({ bgColor = 'bg-nsorange', user }) {
  const containerRef = useRef(null)
  const queryClient = useQueryClient()
  const [isSmallVariant, setSmallVariant] = useState(false)
  const [isMenuOpen, setMenuOpen] = useState(false)

  useResizeObserver(containerRef, () => {
    const shouldGoToSmallVariant = window.innerWidth < 640

    if (shouldGoToSmallVariant && !isSmallVariant) {
      setSmallVariant(true)
    }

    if (!shouldGoToSmallVariant && isSmallVariant) {
      setSmallVariant(false)
    }
  })

  const ITEMS = useMemo(
    () => [
      ...(user
        ? [
            { link: '/files', name: 'Files' },
            { link: '/manage', name: 'API Keys' },
          ]
        : []),
      { link: '/#docs', name: 'Docs', spacing: isSmallVariant ? '' : 'mr4' },
    ],
    [user, isSmallVariant]
  )

  async function logout() {
    await getMagic().user.logout()
    await queryClient.invalidateQueries('magic-user')
    Router.push('/')
  }

  const toggleMenu = () => {
    isMenuOpen
      ? document.body.classList.remove('overflow-hidden')
      : document.body.classList.add('overflow-hidden')
    setMenuOpen(!isMenuOpen)
  }

  return (
    <nav
      className={clsx(
        bgColor,
        'w-100 z-50',
        isSmallVariant ? 'sticky top-0' : ''
      )}
      ref={containerRef}
    >
      <div className="flex items-center justify-between ph3 ph5-ns pv3 center mw9">
        {isSmallVariant && (
          <div className="flex align-middle">
            <Button onClick={toggleMenu} small>
              <Hamburger className="w1 m2" aria-label="Toggle Navbar" />
            </Button>
          </div>
        )}
        <Link href="/">
          <a className="no-underline v-mid">
            <img
              src="/images/logo-nft.storage-sm.png"
              width="160"
              height="79"
              className={clsx(isSmallVariant ? '' : 'mr4', 'v-mid')}
              style={{ maxWidth: '80px', height: 'auto' }}
              alt="NFT Storage Logo"
            />
          </a>
        </Link>
        <div className="flex items-center">
          {!isSmallVariant &&
            ITEMS.map((item, index) => (
              <div key={item.link}>
                <a
                  href={item.link}
                  key={item.name}
                  className={clsx(
                    'f4 black no-underline underline-hover v-mid',
                    item.spacing
                  )}
                >
                  {item.name}
                </a>
                {index !== ITEMS.length - 1 && (
                  <span className="mh2 v-mid b black">•</span>
                )}
              </div>
            ))}
          <div className="mb1">
            {user ? (
              <Button onClick={logout} id="logout">
                Logout
              </Button>
            ) : (
              <Button href="/login" id="login">
                Login
              </Button>
            )}
          </div>
        </div>
      </div>

      <div
        className={clsx(
          bgColor,
          'transition-all duration-300 fixed top-0 left-0 bottom-0 shadow-4 p6 w-100',
          isSmallVariant && isMenuOpen
            ? 'flex flex-column justify-center opacity-100'
            : 'o-0 invisible'
        )}
        style={{ zIndex: 100 }}
        aria-hidden={isSmallVariant && isMenuOpen}
      >
        <div className="flex flex-column items-center text-center mt4">
          <Link href="/">
            <a className="no-underline v-mid">
              <img
                src="/images/logo-nft.storage-sm.png"
                width="160"
                height="79"
                className={clsx(isSmallVariant ? '' : 'mr4', 'v-mid')}
                style={{ maxWidth: '80px', height: 'auto' }}
                alt="NFT Storage Logo"
              />
            </a>
          </Link>
        </div>
        <div className="flex flex-column items-center justify-center text-center pv4 flex-auto">
          {ITEMS.map((item) => (
            <Link href={item.link} key={item.link}>
              <a
                className={clsx(
                  'f1 v-mid chicagoflf pv3',
                  item.spacing,
                  bgColor === 'bg-nsgreen' ? 'black' : 'white'
                )}
                onClick={() => toggleMenu()}
              >
                {item.name}
              </a>
            </Link>
          ))}
        </div>
        <div className="flex flex-column items-center mb4">
          <Button className="flex justify-center" onClick={() => toggleMenu()}>
            <Cross fill="currentColor" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
