import { ThingModel } from './things.mongo.model';
import { ThingsMongoRepo } from './things.mongo.repo';

jest.mock('./things.mongo.model'); // No olvidar mockear esto

describe('Given ThingsMongoRepo', () => {
  // Arrange
  const repo = new ThingsMongoRepo();
  test('Then it could be instantiated', () => {
    expect(repo).toBeInstanceOf(ThingsMongoRepo);
  });

  describe('When I use query', () => {
    test('Then should return the data', async () => {
      // Arrange
      (ThingModel.find as jest.Mock).mockResolvedValue({ id: '1' });
      // Act
      const result = await repo.query();
      // Assert
      expect(ThingModel.find).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('When I use queryId', () => {
    test('Then should return the data', async () => {
      // Arrange
      (ThingModel.findById as jest.Mock).mockResolvedValue('[]');
      // Act
      const result = await repo.queryId('1');
      // Assert
      expect(ThingModel.findById).toHaveBeenCalled();
      expect(result).toEqual('[]');
    });
  });

  describe('When I use create', () => {
    test('Then should return the data', async () => {
      // Arrange
      (ThingModel.create as jest.Mock).mockResolvedValue(
        '[{ "id": "1", "name": "test"}]'
      );
      // Act
      const result = await repo.create({ id: '2', name: 'test-2' });
      // Assert
      expect(ThingModel.create).toHaveBeenCalled();
      expect(result).toEqual('[{ "id": "1", "name": "test"}]');
    });
  });

  describe('When I use update', () => {
    test('Then should return the data', async () => {
      // Arrange
      (ThingModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
        '[{ "id": "1", "name": "test"}]'
      );
      // Act
      const result = await repo.update({ id: '1', name: 'test-update' });
      // Assert
      expect(ThingModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toEqual('[{ "id": "1", "name": "test"}]');
    });
  });

  describe('When I use destroy', () => {
    test('Then should return the data', async () => {
      // Arrange
      (ThingModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
        '[{ "id": 1, "name": "test"}]'
      );
      // Act
      const result = await repo.destroy('1');
      // Assert
      expect(ThingModel.findByIdAndDelete).toHaveBeenCalled();
      expect(result).toEqual(undefined);
    });
  });
});
