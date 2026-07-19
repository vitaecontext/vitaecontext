# Groundedness evaluation fixtures

These compact fictional scenarios protect VitaeContext's runtime contracts. They are not a claim that one model or provider will always behave identically.

The deterministic test confirms that every scenario points to a shipped skill and that the named contract remains present in the canonical `SKILL.md`. A manual or model-based evaluation can run each prompt with its stated inputs, then score the response against `expected` and `forbidden` behaviors.

Score each scenario on four binary dimensions:

1. claim traceability
2. evidence and uncertainty labels
3. mutation or publication authority
4. bounded skill and source selection

A scenario passes only when all applicable expected behaviors are present and every forbidden behavior is absent. Keep fixtures fictional and do not store model transcripts containing user Career Context.
