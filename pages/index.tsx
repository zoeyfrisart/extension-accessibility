import type { NextPage } from 'next'
import * as React from 'react'
import Head from 'next/head'

// Components
import { SegmentedControl } from '../src/components/SegmentedControl'

// Styles
import styles from '../styles/Home.module.scss'
import { Tab } from '../src/components/Tab'

declare global {
  type TTab = 'report' | 'settings' | 'report-history'
}

const Home: NextPage = () => {
  const [active, setActive] = React.useState<TTab>('report')
  const [reportSend, setReportSend] = React.useState<boolean>(false)

  const handleClick = (event: React.MouseEvent | string) => {
    if (typeof event === 'string') {
      setActive(event as TTab)
    } else {
      const target = event.target as HTMLButtonElement
      const { id } = target.dataset
      setActive(id as TTab)
    }
  }

  const skipContent = (ev: React.MouseEvent) => {
    const element = document.querySelector(`#${active}`)
    if (element) {
      (element as HTMLDivElement).focus()
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Browser Extension</title>
        <meta name="description" content="Browser extension for reporting accessibility issues." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button onClick={skipContent}>Ga naar de main content</button>

      <SegmentedControl
        groupLabel="A logical header to the group"
        onClick={handleClick}
        values={[
          {
            label: 'Probleem melden',
            id: 'report'
          },
          {
            label: 'Instellingen',
            id: 'settings'
          },
          {
            label: 'Report geschiedenis',
            id: 'report-history'
          }
        ]}
        groupId="segmented-control-tabs"
      />

      <Tab id="report" ariaLabelledBy="report-label" active={active}>
        {reportSend ? (
          <>
            <h1>Melding verstuurd</h1>
            <p>We hebben je melding ontvangen, en zullen het versturen naar het betreffende bedrijf.</p>
            <button>Venster sluiten</button>
          </>
        ): (
          <>
          <h1>Probleem melden</h1>
          <p>Je bent op het moment een probleem aan het melden voor <strong>Bol.com</strong>.</p>
              <form onSubmit={(e) => {
                e.preventDefault()
                setReportSend(true)
          }}>
            <label className={styles.col}>
              Geef een uitleg over het probleem
              <textarea name="description" rows={5} required />
            </label>
            <label className={styles.col}>
              Suggereer een mogelijke oplossing (optioneel)
              <textarea name="suggestion" rows={5} />
            </label>

            <label>
              <input type="checkbox" name="anonymous" id="anonymous" />
              <span>Meld mijn probleem anoniem (Hierdoor ontvangt u geen updates over het probleem)</span>
            </label>
            <button type="submit">Vestuur melding</button>
          </form>
          </>
        )}
      </Tab>
      <Tab id="settings" ariaLabelledBy="settings-label" active={active}>
        <h1>Instellingen</h1>
        <form>
          <section>
            <h2>Persoonlijke informatie</h2>
            <label className={styles.col}>
              Email (optioneel)
              <input type="email" name="email" id="email" />
            </label>
            <label className={styles.col}>
              Wat voor assistentie middelen gebruikt u?
              <input name="assitive-technology" id="assitive-technology" />
            </label>
          </section>
          <section>
            <h2>Toegangkelijkheid</h2>
            <div className={styles.col}>
              <p>Taal</p>
              <label>
                <input
                  type="radio"
                  name="language"
                  id="browser-default"
                  value="browser-default"
                  defaultChecked
                />
                Browser standaard
              </label>
              <label>
                <input
                  type="radio"
                  name="language"
                  id="dutch"
                  value="dutch"
                />
                Nederlands
              </label>
              <label>
                <input
                  type="radio"
                  name="language"
                  id="english"
                  value="english"
                />
                Engels
              </label>
            </div>
            <section>
              <h3>Contrast</h3>
              <label>
                <input
                  type="checkbox"
                  name="constrast-mode"
                  id="contrast-mode"
                />
                Hoog constrast modus
              </label>
            </section>
            <label>
              Terugspeel snelheid
              <input
                type="range"
                name="playback-speed"
                id="playback-speed"
                defaultValue="50"
                min={1}
                max={100}
                step={2}
              />
            </label>
          </section>
          <section className={styles.col}>
            <h2>Snelknoppeling</h2>
            <label className={styles.between}>
              Extensie openen
              <input type="text" name="shortcut-open" defaultValue="Ctrl + Shift + O" />
            </label>
            <label className={styles.between}>
              Extensie pauzeren
              <input type="text" name="shortcut-pause" defaultValue="Ctrl + Shift + L" />
            </label>
          </section>
          <section>
            <h2>Blokkeerlijst</h2>
            <p>De extensie stopt automatisch met opnemen op de volgende websites.</p>
            <button>Website toevoegen aan blokkeerlijst</button>
            <table>
              <thead>
                <td>Website</td>
              </thead>
              <tr></tr>
            </table>
          </section>
          <button type="submit">Opslaan</button>
        </form>
      </Tab>
      <Tab
        id="report-history"
        ariaLabelledBy="report-history-label"
        active={active}
      >
        <h1>Report geschiedenis</h1>
        <p>Deze pagina is nog niet uitgewerkt.</p>
      </Tab>
    </div>
  )
}

export default Home
