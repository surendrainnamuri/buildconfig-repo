# StayScape — OpenShift BuildConfig Demo

A responsive, dependency-free hotel booking web page designed for an OpenShift workshop. The repository demonstrates a Git-to-image-to-deployment workflow with a `BuildConfig`, `ImageStream`, `DeploymentConfig`, `Service`, and `Route`.

## What participants can demonstrate

- Build a container image directly from a GitHub repository with a Docker-strategy `BuildConfig`.
- Store the resulting image in an OpenShift `ImageStream`.
- trigger a rolling rollout of a `DeploymentConfig` when the image changes.
- Expose the application with a `Service` and TLS-enabled `Route`.
- Observe readiness and liveness probes at `/healthz`.
- Optionally configure a GitHub webhook for automatic builds after a push.

## Preview locally

Open `index.html` directly in a browser. No package installation or build step is required.

To test the container locally:

```bash
podman build -t hotel-booking:local .
podman run --rm -p 8080:8080 hotel-booking:local
```

Then browse to `http://localhost:8080`.

## Push to GitHub

Create an empty GitHub repository, then from this folder run:

```bash
git init
git add .
git commit -m "Add StayScape OpenShift workshop demo"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin main
```

## Deploy on OpenShift

1. Edit `openshift/resources.yaml` and replace `REPLACE_WITH_YOUR_GITHUB_REPOSITORY_URL` with the repository clone URL.
2. Replace the example webhook secret with a suitably random value if you plan to use the webhook.
3. Log in with the `oc` CLI and select or create a project.
4. Apply the resources and start the first build:

```bash
oc apply -f openshift/resources.yaml
oc start-build hotel-booking --follow
oc rollout status dc/hotel-booking
oc get route hotel-booking
```

Open the hostname shown by the final command.

## Suggested workshop flow

1. Inspect the `BuildConfig` source and Docker strategy.
2. Start the build and follow its logs with `oc logs -f bc/hotel-booking`.
3. Watch the `ImageStream` tag update.
4. Watch the image-change trigger launch the `DeploymentConfig` rollout.
5. Change a heading or colour, commit and push, then start another build (or use the GitHub webhook).
6. Compare deployment revisions with `oc rollout history dc/hotel-booking`.

> `DeploymentConfig` is an OpenShift-specific legacy API. It remains useful for workshops that explicitly cover it, while new production workloads will commonly use Kubernetes `Deployment` resources.
