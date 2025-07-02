import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Headless } from "~/components/headless/headless";

export default component$(() => {
	const isComponentRendered = useSignal(false);

	return (
		<>
			<button
				type="button"
				onClick$={() => {
					isComponentRendered.value = true;
				}}
			>
				CSR Render Headless component
			</button>
			{isComponentRendered.value && <HeadlessComp />}
		</>
	);
});

export const HeadlessComp = component$(() => {
	return (
		<Headless.Root>
			<UserComposedComp />
		</Headless.Root>
	);
});

export const UserComposedComp = component$(() => {
	return <Headless.Child />;
});

export const head: DocumentHead = {
	title: "Welcome to Qwik",
	meta: [
		{
			name: "description",
			content: "Qwik site description",
		},
	],
};
