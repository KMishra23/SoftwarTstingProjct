# React Wordle

We implemented a Server-side web application testing method using the CIM (Component Interaction Model) and ATG(Application Transition Graph) paradigm on the ReactJS game "Wordle" implemented by us in a project elective. Wordle, a word-guessing game which challenges players to decipher a secret five-letter word within six attempts. With each guess, the game provides feedback, indicating correct letters in their positions with specific colors. Players strategically narrow down possibilities by analyzing feedback and refining subsequent guesses.We implemented this project using React, Typescript, and Tailwind.

### To Run Locally:

Clone the repository and perform the following command line actions:

```bash
$> cd SOFTWARTSTINGPROJCT
$> npm install
$> npm run start
```

Open [http://localhost:3000](http://localhost:3000) in browser.

## FAQ

### How can I change the length of a guess?

The default configuration is for solutions and guesses of length five, but it is flexible enough to handle other lengths, even variable lengths each day.

To configure for a different constant length:

- Update the `WORDS` array in [src/constants/wordlist.ts](src/constants/wordlist.ts) to include only words of the new length.
- Update the `VALID_GUESSES` array in [src/constants/validGuesses.ts](src/constants/validGuesses.ts) to include only words of the new length.

To configure for variable lengths:

- Update the `WORDS` array in [src/constants/wordlist.ts](src/constants/wordlist.ts) to include words of any of the variable lengths desired.
- Update the `VALID_GUESSES` array in [src/constants/validGuesses.ts](src/constants/validGuesses.ts) to include words of any of the variable lengths desired.

Note that guesses are validated against both the length of the solution, and presence in VALID_GUESSES.
