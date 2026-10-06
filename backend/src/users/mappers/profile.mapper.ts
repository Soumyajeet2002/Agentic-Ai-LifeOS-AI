import { Profile } from '../entities/profile.entity';

export class ProfileMapper {
  static toResponse(profile: Profile) {
    return {
      id: profile.id,
      userId: profile.userId,
      displayName: profile.displayName,
      avatarUrl: profile.avatarUrl,
      timezone: profile.timezone,
      locale: profile.locale,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }

  static toResponseList(profiles: Profile[]) {
    return profiles.map((profile) =>
      ProfileMapper.toResponse(profile),
    );
  }
}