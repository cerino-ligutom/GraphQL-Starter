import { PubSubEngine } from 'graphql-subscriptions';
import { PubSubTriggers } from '.';
import { DummySubscriptionPayload } from 'graphql-resolvers';

// NOTE:
// This is basically an action creator to prevent the user from passing
// the wrong payload to the wrong event.
// Modify the payload type as per what you expect the user of this method
// to pass which is typically the return type defined in the schema for
// the respective subscription.
// Cases where you won't probably want it to be the same as the return type
// defined in the schema would be if you need data transformations which can
// be handled here as well or on the "resolve" field of the
// subscription resolver. The latter is recommended for visibility and to
// leave this function as a pure action creator (single responsibility).
export const publishDummyEvent = (pubsub: PubSubEngine) => async (payload: DummySubscriptionPayload) => {
  await pubsub.publish(PubSubTriggers.DUMMY_EVENT, payload);
};