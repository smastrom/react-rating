import React, { Profiler as ReactProfiler, ProfilerOnRenderCallback } from 'react';

const onRender: ProfilerOnRenderCallback = (
	id,
	phase,
	actualDuration,
	startTime,
	commitTime
) => {
	const performanceData = [
		`phase: ${phase}`,
		`actualDuration: ${actualDuration}`,
		`commitTime: ${commitTime}`,
	].join(', ');
	console.log(performanceData);
};

type JSX = {
	children: JSX.Element;
};

export const Profiler = ({ children }: JSX) => (
	<ReactProfiler onRender={onRender} id="rating">
		{children}
	</ReactProfiler>
);
