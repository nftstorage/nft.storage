import HashLink from '../components/hashlink.js'
/**
 *
 * @returns {{ props: import('../components/types.js').LayoutProps}}
 */
export function getStaticProps() {
  return {
    props: {
      title: 'Privacy- NFT Storage',
      description: 'NFT.Storage privacy',
      navBgColor: 'bg-nspeach',
      needsUser: false,
    },
  }
}

export default function Privacy() {
  return (
    <main className="bg-nspeach grow">
      <div className="max-w-7xl mx-auto p-8 sm:p-16 prose">
        <h1 className="chicagoflf">
          <HashLink id="privacy">NFT.storage Privacy Statement</HashLink>
        </h1>
        <p>Last Updated: 4 April 2024</p>
        <p>
          Your privacy is important to us. This privacy statement explains our
          collection, use, and disclosure of personal data. &nbsp;This privacy
          statement describes and applies to how (“NFT.Storage”) collects, uses,
          shares, and stores personal data when you use the NFT.storage and
          classic.NFT.storage websites (“Website”) and all content, services and
          products available at or through the Website (“Services”) where the
          privacy statement is posted, linked, or referenced.&nbsp;This
          statement applies to our services that display or reference this
          statement, but it does not apply to any NFT.Storage websites or
          services that display or reference a different privacy statement.
        </p>
        <p>
          California consumers can find specific disclosures, including “Notice
          at Collection” details, by clicking here.
        </p>
        <p>PERSONAL DATA WE COLLECT</p>
        <p>
          The personal data we collect depends on how you interact with us, the
          services you use, and the choices you make.
        </p>
        <p>
          We collect information about you from different sources and in various
          ways when you use our services, including information you provide
          directly, information collected automatically, information from
          third-party data sources, and data we infer or generate from other
          data.
        </p>
        <p>
          Information you provide directly. We collect personal data you provide
          to us. For example:
        </p>
        <ul>
          <li>
            Name and contact information. We collect name, username or alias,
            and contact details such as email address.&nbsp;
          </li>
          <li>
            Payment information. If you make a purchase or other financial
            transaction, we collect credit card numbers, financial account
            information, and other payment details.
          </li>
          <li>
            Content and files. We collect the files you upload to our services.
          </li>
          <li>
            Communications and surveys.&nbsp;If you send us email messages or
            other communications or complete surveys or user intake forms, or
            provide feedback regarding the services, we collect and retain those
            communications.
          </li>
          <li>
            Account access information.&nbsp;We collect a username and password
            to enable you to access your account.
          </li>
        </ul>
        <p>
          Information we collect automatically. When you use our services, we
          collect some information automatically. For example:
        </p>
        <ul>
          <li>
            Identifiers and device information. When you visit our websites, our
            web servers automatically log your Internet Protocol (IP) address
            and information about your device, including device identifiers
            (such as MAC address); device type; and your device’s operating
            system, browser, and other software including type, version,
            language, settings, and configuration. As further described in the
            “Cookies, Mobile IDs, and Similar Technologies” section below, our
            websites and online services store and retrieve cookie identifiers,
            mobile IDs, and other data.
          </li>
          <li>
            Geolocation data. Depending on your device and app settings, we
            collect geolocation data when you use our services.
          </li>
          <li>
            Usage data. We automatically log your activity on our website
            connected services, including the URL of the website from which you
            came to our sites, pages you viewed, how long you spent on a page,
            access times, and other details about your use of and actions on our
            website.
          </li>
        </ul>
        <p>
          Information we obtain from third-party sources. We also obtain the
          types of information described above from third parties. These
          third-party sources include, for example:
        </p>
        <ul>
          <li>
            Third-party partners. Third-party applications and services,
            including other networks you choose to connect with or interact with
            through our services such as GitHub.
          </li>
          <li>
            Co-branding/marketing partners. Partners with which we offer
            co-branded services or engage in joint marketing activities.
          </li>
          <li>
            Service providers. Third parties that collect or provide data in
            connection with work they do on our behalf, for example Filecoin
            storage providers that store your files and companies that determine
            your device’s location based on its IP address.
          </li>
          <li>
            Publicly available sources. Public sources of information such as
            open government databases.
          </li>
        </ul>
        <p>
          When you are asked to provide personal data, you may decline. And you
          may use web browser or operating system controls to prevent certain
          types of automatic data collection. But if you choose not to provide
          or allow information that is necessary for certain services or
          features, those services or features may not be available or fully
          functional.
        </p>
        <p>COOKIES, MOBILE IDs, AND SIMILAR TECHNOLOGIES</p>
        <p>
          We use cookies, web beacons, mobile analytics and advertising IDs, and
          similar technologies to operate our websites and online services and
          to help collect data, including usage data, identifiers, and device
          information.
        </p>
        <p>What are cookies and similar technologies?</p>
        <p>
          Cookies are small text files placed by a website and stored by your
          browser on your device. A cookie can later be read when your browser
          connects to a web server in the same domain that placed the cookie.
          The text in a cookie contains a string of numbers and letters that may
          uniquely identify your device and can contain other information as
          well. This allows the web server to recognize your browser over time,
          each time it connects to that web server.
        </p>
        <p>
          Web beacons are electronic images (also called single-pixel or clear
          GIFs) that are contained within a website or email. When your browser
          opens a webpage or email that contains a web beacon, it automatically
          connects to the web server that hosts the image (typically operated by
          a third party). This allows that web server to log information about
          your device and to set and read its own cookies. In the same way,
          third-party content on our websites (such as embedded videos,
          plug-ins, or ads) results in your browser connecting to the
          third-party web server that hosts that content. We also include web
          beacons in our email messages or newsletters to tell us if you open
          and act on them.
        </p>
        <p>How do we and our partners use cookies and similar technologies?</p>
        <p>
          We, and our analytics and advertising partners, use these technologies
          in our website and services to collect personal data (such as the
          pages you visit, the links you click on, and similar usage
          information, identifiers, and device information) when you use our
          services, including personal data about your online activities over
          time and across different websites or online services. This data is
          used to store your preferences and settings, enable you to sign-in,
          analyze how our website performs, track your interaction with the
          site, develop inferences, deliver and tailor interest-based
          advertising, combat fraud, and fulfill other legitimate purposes. We
          and/or our partners also share the data we collect or infer with third
          parties for these purposes. For more information about the third-party
          analytics and advertising partners that collect personal information
          on our services, please see the “Our Disclosure of Personal Data”
          section of this statement.
        </p>
        <p>What controls are available?</p>
        <p>
          There are a range of cookie and related controls available through
          browsers, mobile operating systems, and elsewhere. See the “Choice and
          Control of Personal Data” section below for details.
        </p>
        <p>OUR USE OF PERSONAL DATA</p>
        <p>
          We use the personal data we collect for purposes described in this
          privacy statement or as otherwise disclosed to you. For example, we
          use personal data for the following purposes:
        </p>
        <ul>
          <li>
            Product and service delivery. To provide and deliver our services,
            including troubleshooting, improving, and personalizing those
            services.
          </li>
          <li>
            Business operations.&nbsp;To operate our business, such as billing,
            accounting, improving our internal operations, securing our systems,
            detecting fraudulent or illegal activity, and meeting our legal
            obligations.
          </li>
          <li>
            Product improvement, development, and research. To develop new
            services or features, and conduct research.
          </li>
          <li>
            Personalization.&nbsp;To understand you and your preferences to
            enhance your experience and enjoyment using our services.
          </li>
          <li>
            Customer support.&nbsp;To provide customer support and respond to
            your questions.
          </li>
          <li>
            Communications.&nbsp;To send you information, including
            confirmations, invoices, technical notices, updates, security
            alerts, and support and administrative messages.
          </li>
          <li>
            Marketing. To communicate with you about new services, offers,
            promotions, rewards, contests, upcoming events, and other
            information about our services and those of our selected partners
            (see the “Choice and Control” section of this statement for
            information about how to change your preferences for promotional
            communications).
          </li>
          <li>
            Advertising.&nbsp;To display advertising to you (see the “Cookies”
            section of this statement for information about personalized
            advertising and your advertising choices).
          </li>
        </ul>
        <p>
          We combine data we collect from different sources for these purposes,
          and to give you a more seamless, consistent, and personalized
          experience.
        </p>
        <p>OUR DISCLOSURE OF PERSONAL DATA</p>
        <p>
          We disclose personal data with your consent or as we determine
          necessary to provide the services you have requested or authorized. In
          addition, we disclose each of the categories of personal data
          described above, to the types of third parties described below, for
          the following business purposes:
        </p>
        <ul>
          <li>
            Public information. You may use our services to make certain
            information publicly available. &nbsp;For example, all data uploaded
            to NFT.Storage is available to anyone who requests it using the
            correct content address (CID). Do not store any private or sensitive
            information in an unencrypted form using NFT.Storage.
          </li>
          <li>
            Service providers. We provide personal data to vendors or agents
            working on our behalf for the purposes described in this statement.
            For example, companies we’ve hired to provide customer service
            support or assist in protecting and securing our systems and
            services may need access to personal data to provide those
            functions. In addition, Filecoin storage providers need access to
            the files you choose to upload in order to store them using the
            Interplanetary File System (“IPFS”).
          </li>
          <li>
            Financial services & payment processing. When you provide payment
            data, for example to make a purchase, we will disclose payment and
            transactional data to banks and other entities as necessary for
            payment processing, fraud prevention, credit risk reduction,
            analytics, or other related financial services. We use Stripe for
            payments, analytics, and other business services.&nbsp; Stripe may
            collect personal data including via cookies and similar
            technologies.&nbsp; The personal data Stripe collects may include
            transactional data and identifying information about devices that
            connect to its services. Stripe uses this information to operate and
            improve the services it provides to us, including for fraud
            detection, loss prevention, authentication, and analytics related to
            the performance of its services.&nbsp; You can learn more about
            Stripe and read its privacy policy at{' '}
            <a href="https://www.google.com/url?q=https://stripe.com/privacy&amp;sa=D&amp;source=editors&amp;ust=1712263146871757&amp;usg=AOvVaw36V1Tw9lMMKiIk443Qyrzs">
              https://stripe.com/privacy
            </a>
            .
          </li>
          <li>
            Affiliates. We enable access to personal data across our
            subsidiaries, affiliates, and related companies, for example, where
            we share common data systems or where access helps us to provide our
            services and operate our business.
          </li>
          <li>
            Corporate transactions. We may disclose personal data as part of a
            corporate transaction or proceeding such as a merger, financing,
            acquisition, bankruptcy, dissolution, or a transfer, divestiture, or
            sale of all or a portion of our business or assets.
          </li>
          <li>
            Legal and law enforcement. We will access, disclose, and preserve
            personal data when we believe doing so is necessary to comply with
            applicable law or respond to valid legal process, including from law
            enforcement, national security, or other government agencies.
          </li>
          <li>
            Security, safety, and protecting rights. We will disclose personal
            data if we believe it is necessary to:
          </li>
        </ul>
        <ul>
          <li>
            protect our customers and others, for example to prevent spam or
            attempts to commit fraud, or to help prevent the loss of life or
            serious injury of anyone;
          </li>
          <li>
            operate and maintain the security of our services, including to
            prevent or stop an attack on our computer systems or networks; or
          </li>
          <li>
            protect the rights or property of ourselves or others, including
            enforcing our agreements, terms, and policies.
          </li>
        </ul>
        <p>
          Third party analytics also collect personal data through our website
          including identifiers and device information (such as cookie IDs,
          device IDs, and IP address), geolocation data, usage data, and
          inferences based on and associated with that data, as described in the
          “Cookies” section of this statement. For example, we the following
          analytics providers on our classic.nft.storage website:{' '}
          <a href="https://www.google.com/url?q=https://www.twilio.com/en-us/legal/privacy&amp;sa=D&amp;source=editors&amp;ust=1712263146873164&amp;usg=AOvVaw2Yscifbp06y-J_0SOTqKa9">
            Twilio Segment
          </a>
          ,{' '}
          <a href="https://www.google.com/url?q=https://plausible.io/privacy&amp;sa=D&amp;source=editors&amp;ust=1712263146873319&amp;usg=AOvVaw0RI74TrpSRxMeeAojp6Apj">
            Plausible Analytics
          </a>
          , and{' '}
          <a href="https://www.google.com/url?q=https://www.cloudflare.com/privacypolicy/&amp;sa=D&amp;source=editors&amp;ust=1712263146873454&amp;usg=AOvVaw1GOKTU2ZcsYhNRLljuNoq4">
            Cloudflare Insights
          </a>
          . We use the following service providers on our nft.storage website:{' '}
          <a href="https://www.google.com/url?q=https://grafana.com/legal/privacy-policy/&amp;sa=D&amp;source=editors&amp;ust=1712263146873573&amp;usg=AOvVaw3e3TtDGAiQ5c2mYaYF5fRL">
            Grafana
          </a>
          . You can view the privacy notices of these companies by clicking on
          their names above.
        </p>
        <p>
          Please note that some of our services also include integrations,
          references, or links to services provided by third parties whose
          privacy practices differ from ours. If you provide personal data to
          any of those third parties, or allow us to share personal data with
          them, that data is governed by their privacy statements.
        </p>
        <p>
          Finally, we may disclose de-identified information in accordance with
          applicable law.
        </p>
        <p>CHOICE AND CONTROL OF PERSONAL DATA</p>
        <p>
          We provide a variety of ways for you to control the personal data we
          hold about you, including choices about how we use that data. In some
          jurisdictions, these controls and choices may be enforceable as rights
          under applicable law.
        </p>
        <p>
          Access, portability, correction, and deletion. If you wish to access,
          copy, download, correct, or delete personal data about you that we
          hold, you may access your account by logging into site.
        </p>
        <p>
          If you are unable to access, copy, correct, or delete certain personal
          data we have via the means described above, you can send us a request
          by using contact methods described at the bottom of this privacy
          statement.
        </p>
        <p>
          Note, deleting files from the NFT.Storage site’s Files page will
          remove them from the file listing for your account, but that doesn’t
          prevent nodes on the decentralized storage network from retaining
          copies of the data indefinitely. Do not use NFT.Storage for data that
          may need to be permanently deleted in the future.
        </p>
        <p>
          Communications preferences. You can choose whether to receive
          promotional communications from us by email. If you receive
          promotional email from us and would like to stop, you can do so by
          following the directions in that message or by contacting us as
          described in the “Contact Us” section below. These choices do not
          apply to certain informational communications including surveys and
          mandatory service communications.
        </p>
        <p>Browser or platform controls.</p>
        <ul>
          <li>
            Cookie controls. Most web browsers are set to accept cookies by
            default. If you prefer, you can go to your browser settings to learn
            how to delete or reject cookies. If you choose to delete or reject
            cookies, this could affect certain features or services of our
            website. If you choose to delete cookies, settings and preferences
            controlled by those cookies, including advertising preferences, may
            be deleted and may need to be recreated.
          </li>
          <li>
            Global Privacy Control. Some browsers and browser extensions support
            the “Global Privacy Control” (GPC) or similar controls that can send
            a signal to the websites you visit indicating your choice to opt-out
            from certain types of data processing, including data sales and/or
            targeted advertising, as specified by applicable law. When we detect
            such a signal, we will make reasonable efforts to respect your
            choices indicated by a GPC setting or similar control that is
            recognized by regulation or otherwise widely acknowledged as a valid
            opt-out preference signal.
          </li>
          <li>
            Do Not Track. Some browsers include a &quot;Do Not Track&quot; (DNT)
            setting that can send a signal to the websites you visit indicating
            you do not wish to be tracked. Unlike the GPC described above, there
            is not a common understanding of how to interpret the DNT signal;
            therefore, our websites do not respond to browser DNT signals.
            Instead, you can use the range of other tools to control data
            collection and use, including the GPC, cookie controls, and
            advertising controls described above.
          </li>
          <li>
            Mobile advertising ID controls. iOS and Android operating systems
            provide options to limit tracking and/or reset the advertising IDs.
          </li>
        </ul>
        <p>
          Email web beacons. Most email clients have settings that allow you to
          prevent the automatic downloading of images, including web beacons,
          and the automatic connection to the web servers that host those
          images.
        </p>
        <p>
          Except for the automated controls described above, if you send us a
          request to exercise your rights or these choices, to the extent
          permitted by applicable law, we may charge a fee or decline requests
          in certain cases. For example, we may decline requests where granting
          the request would be prohibited by law, could adversely affect the
          privacy or other rights of another person, would reveal a trade secret
          or other confidential information, or would interfere with a legal or
          business obligation that requires retention or use of the data.
          Further, we may decline a request where we are unable to authenticate
          you as the person to whom the data relates, the request is
          unreasonable or excessive, or where otherwise permitted by applicable
          law. If you receive a response from us informing you that we have
          declined your request, in whole or in part, you may appeal that
          decision by submitting your appeal to us using the contact method
          described at the bottom of this privacy statement.
        </p>
        <p>EUROPEAN DATA PROTECTION RIGHTS</p>
        <p>
          If the processing of personal data about you is subject to European
          Union data protection law, you have certain rights with respect to
          that data:
        </p>
        <ul>
          <li>
            You can request access to, and rectification or erasure of, personal
            data;
          </li>
          <li>
            If any automated processing of personal data is based on your
            consent or a contract with you, you have a right to transfer or
            receive a copy of the personal data in a usable and portable format;
          </li>
          <li>
            If the processing of personal data is based on your consent, you can
            withdraw consent for future processing at any time;
          </li>
          <li>
            You can object to, or obtain a restriction of, the processing of
            personal data under certain circumstances; and
          </li>
          <li>
            For residents of France, you can send us specific instructions
            regarding the use of your data after your death.
          </li>
        </ul>
        <p>
          To make such requests, please use the contact information at the
          bottom of this statement. You also have the right to lodge a complaint
          with a supervisory authority, but we encourage you to first contact us
          with any questions or concerns.
        </p>
        <p>
          We rely on different lawful bases for collecting and processing
          personal data about you, for example, with your consent and/or as
          necessary to provide the services you use, operate our business, meet
          our contractual and legal obligations, protect the security of our
          systems and our customers, or fulfil other legitimate interests.
        </p>
        <p>CALIFORNIA PRIVACY RIGHTS</p>
        <p>
          If you are a California resident and the processing of personal
          information about you is subject to the California Consumer Privacy
          Act (CCPA), you have certain rights with respect to that information.
        </p>
        <p>
          Notice at Collection. At or before the time of collection, you have a
          right to receive notice of our practices, including the categories of
          personal information and sensitive personal information to be
          collected, the purposes for which such information is collected or
          used, whether such information is sold or shared, and how long such
          information is retained. You can find those details in this statement
          by clicking on the above links.
        </p>
        <p>
          Right to Know. You have a right to request that we disclose to you the
          personal information we have collected about you. You also have a
          right to request additional information about our collection, use,
          disclosure, or sale of such personal information. Note that we have
          provided much of this information in this privacy statement. You may
          exercise this right logging into and accessing your account or by
          making a “request to know” by using the contact details at the bottom
          of this statement.
        </p>
        <p>
          Rights to Request Correction or Deletion. You also have rights to
          request that we correct inaccurate personal information and that we
          delete personal information under certain circumstances, subject to a
          number of exceptions. To make a request to correct or delete, please
          log into your account to change or delete your information or contact
          us as described at the bottom of this statement.
        </p>
        <p>
          Right to Opt-Out / “Do Not Sell or Share My Personal Information”. You
          have a right to opt-out from future “sales” or “sharing” of personal
          information as those terms are defined by the CCPA.
        </p>
        <p>
          Note that we do not “sell” or “share” personal information as defined
          by the CCPA and have not done so in the past 12 months.
        </p>
        <p>
          We do not knowingly sell or share the personal information of minors
          under 16 years of age.
        </p>
        <p>
          Right to Limit Use and Disclosure of Sensitive Personal Information.
          You have a right to limit our use of sensitive personal information
          for any purposes other than to provide the services or goods you
          request or as otherwise permitted by law. Note that we do not use
          sensitive personal information for any such additional purposes.
        </p>
        <p>
          You may designate, in writing or through a power of attorney, an
          authorized agent to make requests on your behalf to exercise your
          rights under the CCPA. Before accepting such a request from an agent,
          we will require the agent to provide proof you have authorized it to
          act on your behalf, and we may need you to verify your identity
          directly with us.
        </p>
        <p>
          Further, to provide, correct, or delete specific pieces of personal
          information we will need to verify your identity to the degree of
          certainty required by law. We will verify your request by asking you
          to send it from the email address associated with your account or
          requiring you to provide information necessary to verify your account.
        </p>
        <p>
          Finally, you have a right to not be discriminated against for
          exercising these rights set out in the CCPA.
        </p>
        <p>
          Additionally, under California Civil Code section 1798.83, also known
          as the “Shine the Light” law, California residents who have provided
          personal information to a business with which the individual has
          established a business relationship for personal, family, or household
          purposes (“California Customers”) may request information about
          whether the business has disclosed personal information to any third
          parties for the third parties’ direct marketing purposes.
        </p>
        <p>
          Please be aware that we do not disclose personal information to any
          third parties for their direct marketing purposes as defined by this
          law.
        </p>
        <p>
          California Customers may request further information about our
          compliance with this law by emailing us at the address provided at the
          bottom of this privacy statement. &nbsp;Please note that businesses
          are required to respond to one request per California Customer each
          year and may not be required to respond to requests made by means
          other than through the designated email address.
        </p>
        <p>RETENTION OF PERSONAL DATA</p>
        <p>
          We retain personal data for as long as necessary to provide the
          services and fulfill the transactions you have requested, comply with
          our legal obligations, resolve disputes, enforce our agreements, and
          for other legitimate and lawful business purposes. Because these needs
          can vary for different data types in the context of different
          services, actual retention periods can vary significantly based on
          criteria such as user expectations or consent, the availability of
          automated controls that enable users to delete data, and our legal or
          contractual obligations. For example, we retain financial transaction
          data for a period of 7 years.
        </p>
        <p>LOCATION OF PERSONAL DATA</p>
        <p>
          The personal data we collect may be stored and processed in your
          country or region, or in any other country where we or our affiliates,
          subsidiaries, or service providers process data, some of which may
          have laws that offer different levels of data protection than the
          country in which you reside. Currently, we primarily use Filecoin
          storage providers in the U.S. and EU. The storage location(s) are
          chosen to operate efficiently and create redundancies. We take steps
          to process and protect personal data as described in this statement
          wherever the data is located.
        </p>
        <p>
          Location of Processing European Personal Data. If we transfer personal
          data from the European Economic Area (EEA), United Kingdom (UK), and
          Switzerland to other countries that have not been determined by the
          European Commission to have an adequate level of data protection, we
          will use legal mechanisms, including contracts, to help ensure your
          rights and protections. To learn more about the European Commission’s
          decisions on the adequacy of personal data protections, please visit:{' '}
          <a href="https://www.google.com/url?q=https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en&amp;sa=D&amp;source=editors&amp;ust=1712263146878343&amp;usg=AOvVaw2qA9B_kiHR2IaCt6O94v4G">
            https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en
          </a>
          .
        </p>
        <p>SECURITY OF PERSONAL DATA</p>
        <p>
          We take reasonable and appropriate steps to help protect personal data
          from unauthorized access, use, disclosure, alteration, and
          destruction.
        </p>
        <p>
          To help us protect personal data, we request that you use a strong
          password and never share your password with anyone or use the same
          password with other sites or accounts.
        </p>
        <p>CHANGES TO THIS PRIVACY STATEMENT</p>
        <p>
          We will update this privacy statement when necessary to reflect
          changes in our services, how we use personal data, or the applicable
          law. When we post changes to the statement, we will revise the
          &quot;Last Updated&quot; date at the top of the statement. If we make
          material changes to the statement, we will provide notice or obtain
          consent regarding such changes as may be required by law.
        </p>
        <p>HOW TO CONTACT US</p>
        <p>
          If you have a privacy concern, complaint, or a question for
          NFT.Storage, please contact us at{' '}
          <a href="mailto:support@nft.storage">support@nft.storage</a>.
        </p>
        <p>
          Our address is 31 Egerton Street, Silverwater, NSW, 2128, Australia.
        </p>
        <hr />
      </div>
    </main>
  )
}
