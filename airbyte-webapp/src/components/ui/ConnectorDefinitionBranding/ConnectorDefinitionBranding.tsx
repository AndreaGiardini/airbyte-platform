import { ConnectorIcon } from "components/common/ConnectorIcon";
import { ReleaseStageBadge } from "components/ReleaseStageBadge";
import { Text } from "components/ui/Text";

import { DestinationDefinitionId, SourceDefinitionId } from "core/request/AirbyteClient";
import { useDestinationDefinitionList } from "services/connector/DestinationDefinitionService";
import { useSourceDefinitionList } from "services/connector/SourceDefinitionService";

import styles from "./ConnectorDefinitionBranding.module.scss";
import { FlexContainer } from "../Flex";

type ConnectorDefinitionBrandingProps = SourceDefinitionProps | DestinationDefinitionProps;

interface SourceDefinitionProps {
  sourceDefinitionId: SourceDefinitionId;
  destinationDefinitionId?: never;
}

interface DestinationDefinitionProps {
  destinationDefinitionId: DestinationDefinitionId;
  sourceDefinitionId?: never;
}

/**
 * Displays the branding (icon, name and release stage) for a connector definition by passing in either a sourceDefinitionId or a destinationDefinitionId
 */
export const ConnectorDefinitionBranding = ({
  sourceDefinitionId,
  destinationDefinitionId,
}: ConnectorDefinitionBrandingProps) => {
  return (
    <FlexContainer alignItems="center" gap="sm">
      {sourceDefinitionId !== undefined ? (
        <SourceDefinitionBranding sourceDefinitionId={sourceDefinitionId} />
      ) : (
        <DestinationDefinitionBranding destinationDefinitionId={destinationDefinitionId} />
      )}
    </FlexContainer>
  );
};

interface SourceDefinitionBrandingProps {
  sourceDefinitionId: SourceDefinitionId;
}

const SourceDefinitionBranding: React.FC<SourceDefinitionBrandingProps> = ({ sourceDefinitionId }) => {
  const { sourceDefinitionMap } = useSourceDefinitionList();

  const sourceDefinition = sourceDefinitionMap.get(sourceDefinitionId);

  return sourceDefinition ? (
    <>
      <ConnectorIcon icon={sourceDefinition.icon} />
      <Text className={styles.name}>{sourceDefinition.name}</Text>
      <ReleaseStageBadge stage={sourceDefinition.releaseStage} />
    </>
  ) : null;
};

interface DestinationDefinitionBrandingProps {
  destinationDefinitionId: SourceDefinitionId;
}

const DestinationDefinitionBranding: React.FC<DestinationDefinitionBrandingProps> = ({ destinationDefinitionId }) => {
  const { destinationDefinitionMap } = useDestinationDefinitionList();

  const destinationDefinition = destinationDefinitionMap.get(destinationDefinitionId);

  return destinationDefinition ? (
    <>
      <ConnectorIcon icon={destinationDefinition.icon} />
      <Text className={styles.name}>{destinationDefinition.name}</Text>
      <ReleaseStageBadge stage={destinationDefinition.releaseStage} />
    </>
  ) : null;
};
