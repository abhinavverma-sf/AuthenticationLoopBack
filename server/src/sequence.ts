import {
  RestBindings,
  SequenceHandler,
  FindRoute,
  ParseParams,
  InvokeMethod,
  Send,
  Reject,
  RequestContext,
} from '@loopback/rest';
import {inject} from '@loopback/context';
import {AuthenticationBindings, AuthenticateFn} from '@loopback/authentication';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) protected send: Send,
    @inject(SequenceActions.REJECT) protected reject: Reject,
    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn,
  ) {}

  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      response.header('Access-Control-Allow-Origin', 'http://localhost:4200');
      response.header(
        'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      );
      response.header('Access-Control-Allow-Credentials', 'true');
      response.header(
        'Access-Control-Allow-Methods','*',
      );
      if (request.method == 'OPTIONS') {
        response.status(200);
        this.send(response, 'ok');
      } else {
        // This is the important line added to the default sequence implementation
        const route = this.findRoute(request);
        await this.authenticateRequest(request);

        const args = await this.parseParams(request, route);
        const result = await this.invoke(route, args);
        this.send(response, result);
      }
    } catch (error) {
      this.reject(context, error);
    }
  }
}
