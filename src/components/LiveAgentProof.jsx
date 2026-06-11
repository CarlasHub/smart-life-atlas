import { useState } from 'react';
import { AlertTriangle, CheckCircle2, CloudLightning, Database, LoaderCircle, Mail, Play, ShieldCheck } from 'lucide-react';

function formatNumber(value) {
  return typeof value === 'number' ? value.toLocaleString() : '0';
}

function statusLabel(status) {
  if (status === 'ready') return 'Live answer generated';
  if (status === 'cached_ready') return 'Cached live answer';
  if (status === 'disabled') return 'Live proof disabled';
  if (status === 'not_configured') return 'Backend needs secrets';
  if (status === 'blocked') return 'Live cap reached';
  if (status === 'error') return 'Live proof failed';
  return 'Not run in this browser';
}

export function LiveAgentProof() {
  const [state, setState] = useState({
    loading: false,
    result: null
  });

  async function runLiveProof() {
    setState({ loading: true, result: null });

    try {
      const response = await fetch('/api/live-agent-proof?query=post-op', {
        method: 'GET',
        headers: { Accept: 'application/json' }
      });
      const result = await response.json();
      setState({
        loading: false,
        result: {
          ...result,
          httpStatus: response.status
        }
      });
    } catch (error) {
      setState({
        loading: false,
        result: {
          status: 'error',
          reason: 'The browser could not reach the live proof endpoint.',
          detail: error instanceof Error ? error.message : 'Unknown browser error'
        }
      });
    }
  }

  const { loading, result } = state;
  const isReady = result?.status === 'ready' || result?.status === 'cached_ready';
  const StatusIcon = isReady ? CheckCircle2 : result ? AlertTriangle : CloudLightning;

  return (
    <section className="live-proof" aria-labelledby="live-proof-title">
      <div className="live-proof-header">
        <div className="section-heading compact">
          <p className="eyebrow">Live capped proof</p>
          <h2 id="live-proof-title" className="text-headline-medium">Run the Gemini and MongoDB MCP path from the app.</h2>
          <p className="text-body-medium">
            This calls a server-side endpoint only for the fixed post-op demo. It does not accept custom prompts or expose credentials in the browser.
          </p>
        </div>

        <button
          type="button"
          className="m3-button primary"
          onClick={runLiveProof}
          disabled={loading}
        >
          {loading ? <LoaderCircle size={18} aria-hidden="true" className="spin-icon" /> : <Play size={18} aria-hidden="true" />}
          {loading ? 'Running' : 'Run live proof'}
        </button>
      </div>

      <div className="live-proof-guards" aria-label="Live proof safeguards">
        <span><ShieldCheck size={16} aria-hidden="true" /> Preset query only</span>
        <span><CloudLightning size={16} aria-hidden="true" /> 1 generation/day default</span>
        <span><Database size={16} aria-hidden="true" /> MongoDB MCP read-only</span>
        <span><Mail size={16} aria-hidden="true" /> Email before live use</span>
      </div>

      <article className={`live-proof-result ${isReady ? 'ready' : result ? 'blocked' : 'idle'}`} aria-live="polite">
        <div className="live-proof-status">
          {loading ? <LoaderCircle size={22} aria-hidden="true" className="spin-icon" /> : <StatusIcon size={22} aria-hidden="true" />}
          <strong>{loading ? 'Running live proof' : statusLabel(result?.status)}</strong>
          {result?.httpStatus && <span>HTTP {result.httpStatus}</span>}
        </div>

        {!result && !loading && (
          <p className="text-body-medium">
            The hosted endpoint has a hard preset query and a low server-side generation cap. Repeated successful responses are served from cache.
          </p>
        )}

        {result && !isReady && (
          <div className="live-proof-copy">
            <p className="text-body-medium">{result.reason}</p>
            {Array.isArray(result.missingEnvironment) && (
              <ul>
                {result.missingEnvironment.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
            {result.detail && <p className="text-body-small">{result.detail}</p>}
          </div>
        )}

        {isReady && (
          <div className="live-proof-copy">
            <p className="text-body-large">{result.answer}</p>

            <dl className="live-proof-metrics">
              <div>
                <dt>Model</dt>
                <dd>{result.model}</dd>
              </div>
              <div>
                <dt>MCP tools</dt>
                <dd>{result.mcpServer?.exposedTools?.join(', ')}</dd>
              </div>
              <div>
                <dt>Prompt tokens</dt>
                <dd>{formatNumber(result.rawUsageMetadata?.promptTokenCount)}</dd>
              </div>
              <div>
                <dt>Answer tokens</dt>
                <dd>{formatNumber(result.rawUsageMetadata?.candidatesTokenCount)}</dd>
              </div>
              <div>
                <dt>Usage email</dt>
                <dd>{result.usageNotification?.status === 'sent_before_generation' ? 'Sent before generation' : 'No new generation'}</dd>
              </div>
            </dl>
          </div>
        )}
      </article>
    </section>
  );
}
