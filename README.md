# Solana Bounty Program

[![GitHub contributors](https://img.shields.io/github/contributors/andresmgsl/solana-cohort-june-2022)](https://github.com/andresmgsl/solana-cohort-june-2022/contributors)
[![GitHub license](https://img.shields.io/github/license/andresmgsl/solana-cohort-june-2022)](https://github.com/andresmgsl/solana-cohort-june-2022/blob/master/LICENSE)
[![GitHub Language](https://img.shields.io/github/languages/top/andresmgsl/solana-cohort-june-2022)](https://img.shields.io/github/languages/count/andresmgsl/solana-cohort-june-2022)
[![Figma](https://badgen.net/badge/icon/Figma%20Prototype/orange?icon=https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg&label)]([https://www.figma.com/proto/uhH23aRZvGQsOViY0bnnVP/Gomoku?node-id=64%3A19](https://www.figma.com/file/sNkHueU0kTpW4FAWoIfhPN/Solana-Bounty))
[![Notion](https://badgen.net/badge/icon/Notion%20Workspace/black?icon=https://cdn.worldvectorlogo.com/logos/notion-logo-1.svg&label)]([https://opposite-brain-cb0.notion.site/CS408-1e5c4e3c9b0d4291b6a968855d9270e9](https://www.notion.so/Solana-bounty-13550fcc0bc045a484f51d7d56d2a160))

| <!-- -->    | <!-- -->    |
:-------------------------:|:-------------------------:
![screencapture-solana-bounty-program-vercel-app-explorer-2022-08-17-03_03_51](https://user-images.githubusercontent.com/14112766/185019856-1096365f-6eac-46fc-bd3e-62ee36cec187.png) |  ![screencapture-solana-bounty-program-vercel-app-explorer-2022-08-17-03_04_07](https://user-images.githubusercontent.com/14112766/185019858-0de0b6de-acf4-4d34-aa1d-269a4a2bf0a7.png)


<details>
    <summary> Table of Contents </summary>
    <ol> 
        <li> <a href="#target-audience"> Target audience </a> </li>
            <ol>
                <li> <a href="#how-does-the-software-benefit-each-group"> How does this software benefit each group? </a> </li>
            </ol>
        <li> <a href="#tech-stack"> Tech stack </a> </li>
        <li> <a href="#development-process"> Development process </a> </li>
            <ol>
                <li> <a href="#design"> Design </a> </li>
                <li> <a href="#back-end"> Back-end </a> </li>
                <li> <a href="#web3"> Web3 </a> </li>
            </ol>
        <li> <a href="#team-members"> Team members </a> </li>
</details>

## Target audience
This software aims to benefit the following groups of people:
- Maintainers:
   - Owners of open-source repositories who wish to find talented and driven contributors and developers.
- Hunters
   - Hackers wanting to join Web3 space or discover new, rewarding projects - without committing to a full-time position.
- Funders
   - Crypto and open-source fans that want to drive the development of their favourite projects.

### How does the software benefit each group?

- Maintainer:
   - The Bounty Program makes it easy to find enthusiastic developers for open-source projects.
   - Open-source contributors get compensated for their work, enabling them to participate without becoming full-time developers.
   - It can additionally be used as an effective project management tool.
- Hunter:
   - Completing bounties nets the bounty hunter levels, showcasing their commitment to open-source development as well as your past performance on the project.
   - Bounties are created by the maintainers of a project, and are assigned to contributors who are interested in working on the project.
- Funder:
   -  Funding bounties with crypto ensures that the projects you love have the resources to continue to grow and attract the most driven developers.
   -  Transactions are performed on the powerful and reliable Solana network, and payments can easily be performed using Solana Pay.

## Tech stack

## Development process

### Design

The UI was designed in a circular manner. Basic prototypes were created in Figma to establish the style system and map out basic interactions. Afterwards, the front-end was implemented using [TailwindCSS](https://tailwindcss.com/). This approach allowed for the design to be iterated upon over time, without sacrificing agility during development and ensuring a rapid turnaround time.

### Back-end

The backend is based primarily on [Drill](https://github.com/heavy-duty/platform), a Web3 ecosystem by [Heavy Duty](https://heavyduty.builders/) that includes web services as well as NPM packages allowing the creation of bounty programs that are deeply integrated with Solana and GitHub. Using GitHub Actions, Drill automates the process of creating, funding, closing, and claiming bounties (with hunter, owner, and additional metadata stored as GitHub issues interacted with via authenticated GitHub API requests), of which only the critical information is stored on-chain. Therefore, the Bounty Program can be thought of as a fully-managed, two-part service that leverages both the GitHub API and Solana’s [spl-token](https://solana-labs.github.io/solana-program-library/token/js/) library for all of its transactions.

### Web3

Crypto integration required the implementation of a custom Solana-based wallet adapter to ensure the flow of the design system remained consistent. The claiming and funding flows were achieved using Solana’s [web3.js](https://solana-labs.github.io/solana-web3.js/) library and SWR. Solana Pay QR Code are dynamically added to smoothen the funding process for users.

## Demo & verification

## Team members

<table>
  <tr>
    <td align="center">
    <a href="https://github.com/HaresMahmood" target="_black">
    <img src="https://avatars.githubusercontent.com/u/14112766?v=4" width="150px;" alt="Hares Mahmoood"/>
    <br />
    <sub><b>Hares Mahmoood</b></sub></a>
    </td>
    <td align="center">
    <a href="https://github.com/hreyesm" target="_black">
    <img src="https://avatars.githubusercontent.com/u/36577958?v=4" width="150px;" alt="Héctor Reyes Manrique"/>
    <br />
    <sub><b>Héctor Reyes Manrique</b></sub></a>
    </td>
    <td align="center">
    <a href="https://github.com/WilliamWang2002" target="_black">
    <img src="https://avatars.githubusercontent.com/u/73449575?v=4" width="150px;" alt="William Wang"/>
    <br />
    <sub><b>William Wang</b></sub></a>
    </td>
    <td align="center">
    <a href="https://github.com/ZeyadTarekk" target="_black">
    <img src="https://avatars.githubusercontent.com/u/76125650?v=4" width="150px;" alt="Zeyad Tarek"/>
    <br />
    <sub><b>Zeyad Tarek</b></sub></a>
    </td>
  </tr>
 </table>

