import { spawn } from "child_process";
import type { Readable, Writable } from "stream";
import chalk from "chalk";

export async function whoSaidThat(command: string): Promise<number> {
	const packageName = process.env.npm_package_name;
	const scriptName = process.env.npm_lifecycle_event;

	if (!packageName || !scriptName) {
		console.log("Not in a script");
		return 1;
	}

	const prefix = `[${packageName} ${scriptName}]:`;
	const color = colors[Math.trunc(Math.random() * colors.length)];

	return new Promise<number>((resolve, reject) => {
		const cp = spawn(command, {
			shell: true,
			stdio: ["inherit", "pipe", "pipe"],
		});

		cp.on("error", (error) => {
			reject(error);
		});

		cp.on("exit", (code) => {
			resolve(code || 1);
		});

		prefixOutput(prefix, cp.stdout, process.stdout, color);
		prefixOutput(prefix, cp.stderr, process.stderr, color);
	});
}

function prefixOutput(
	prefix: string,
	input: Readable,
	output: Writable,
	color: typeof colors[number],
) {
	let remaining = "";
	input.setEncoding("utf-8");
	input.on("data", (chunk: string) => {
		let lines = chunk.split("\n");

		if (remaining) {
			lines[0] = remaining + lines[0];
			remaining = "";
		}

		remaining = lines[lines.length - 1];
		lines = lines.slice(0, -1);

		for (const line of lines) {
			output.write(chalk[color](prefix) + " " + line + "\n");
		}
	});

	input.on("end", () => {
		if (remaining) output.write(chalk[color](prefix) + " " + remaining);
	});
}

const colors = [
	"red",
	"green",
	"yellow",
	"blue",
	"magenta",
	"cyan",
	"blackBright",
	"redBright",
	"greenBright",
	"yellowBright",
	"blueBright",
	"magentaBright",
	"cyanBright",
	"whiteBright",
] as const;
