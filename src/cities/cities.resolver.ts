import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';
import { CreateCityInput, UpdateCityInput } from './dto';

@Resolver(() => City)
export class CitiesResolver {
  constructor(private readonly citiesService: CitiesService) {}

  @Mutation(() => City)
  createCity(@Args('createCityInput') createCityInput: CreateCityInput):Promise<City> {
    return this.citiesService.create(createCityInput);
  }

  @Query(() => [City], { name: 'cities' })
  findAll():Promise<City[]> {
    return this.citiesService.findAll();
  }

  @Query(() => City, { name: 'city' })
  findOne(@Args('id', { type: () => ID }) id: string):Promise<City> {
    return this.citiesService.findOne(id);
  }

  @Mutation(() => City)
  updateCity(@Args('updateCityInput') updateCityInput: UpdateCityInput):Promise<City> {
    return this.citiesService.update(updateCityInput.id, updateCityInput);
  }

  @Mutation(() => City)
  removeCity(@Args('id', { type: () => ID }) id: string):Promise<City> {
    return this.citiesService.remove(id);
  }
}
