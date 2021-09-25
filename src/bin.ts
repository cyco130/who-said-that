import { whoSaidThat } from ".";

async function main() {
	const [, , ...command] = process.argv;
	const code = await whoSaidThat(command.join(" "));
	process.exit(code);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
