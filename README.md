# Akto Github Action

## Example usage

```yaml
- uses: oren-akto/akto-github-action@v1.0
    with:
      AKTO_DASHBOARD_URL: ${{secrets.AKTO_DASHBOARD_URL}}
      AKTO_API_KEY: ${{secrets.AKTO_API_KEY}}
      AKTO_TEST_ID: ${{secrets.AKTO_TEST_ID}}
      START_TIME_DELAY: 180 # Delay in seconds after which testing run is started, optional, default is 0 
```